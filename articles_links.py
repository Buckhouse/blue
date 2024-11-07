from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from urllib.parse import urlparse, urlunparse
from webdriver_manager.chrome import ChromeDriverManager
import time
import re

# Set up Chrome WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Open your Medium page
driver.get("https://buckhouse.medium.com/")

# Wait for page to load completely
time.sleep(5)

# Scroll down to load more articles
SCROLL_PAUSE_TIME = 2
MAX_SCROLLS = 10

scroll_count = 0
last_height = driver.execute_script("return document.body.scrollHeight")
while scroll_count < MAX_SCROLLS:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(SCROLL_PAUSE_TIME)
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height
    scroll_count += 1

# Use a broader selector to find article elements containing URLs
articles = driver.find_elements(By.TAG_NAME, "a")

# Use a regex pattern to capture only valid Medium article URLs
article_pattern = re.compile(r'https://buckhouse\.medium\.com/[a-zA-Z0-9-]+-\w+')
formatted_links = []
seen_links = set()  # Set to track unique links

for article in articles:
    link = article.get_attribute("href")
    title = article.text.strip()

    # Skip links with numeric-only or empty titles
    if not title or title.isdigit():
        continue

    # Remove query parameters from the link
    parsed_url = urlparse(link)
    cleaned_url = urlunparse(parsed_url._replace(query=""))

    # Truncate the title if it’s too long or contains multiple lines
    if len(title) > 100 or "\n" in title:
        title = title.split("\n")[0]  # Keep only the first line
        title = title[:100]  # Limit to 100 characters

    # Filter only links that match the Medium article URL pattern
    if article_pattern.match(cleaned_url) and cleaned_url not in seen_links:
        formatted_links.append(f'<a href="{cleaned_url}" class="writing-list-item">{title}</a>')
        seen_links.add(cleaned_url)  # Add to set to avoid duplicates

# Write the cleaned links to an HTML file
output_file = "medium_articles.html"
with open(output_file, "w") as file:
    for link in formatted_links:
        file.write(link + "\n")

print(f"Cleaned links have been saved to {output_file}")

# Close the browser
driver.quit()