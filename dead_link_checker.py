import json
import requests


def get_page(page_url):
    """Try to access page, and return the result

    :rtype: int
    :returns: HTTP response code
    """

    response = requests.get(page_url)

    return response.status_code


def get_all_links():
    """Get all links from json file

    :rtype: list
    :returns: List of all links as (title, link) tuples
    """

    with open("resources/o.json", "r") as links_file:
        content = json.load(links_file)

    links = content["readings"]

    return [(link["title"], link["link"]) for link in links]


def check_dead_links():
    """Check every link and report the status"""

    broken_links = 0
    links = get_all_links()

    for title, url in links:

        print(f"Checking link for '{title}'")

        try:
            result = get_page(url)

            if result != 200:
                print("#"*33, "DEAD LINK", "#"*33)
                print(f"Name: {title}\nUrl: {url}\n\n")

                broken_links += 1

        except Exception as exp:
            print(exp)

    print(f"\nNumber of total links: {len(links)}")
    print(f"Number of broken links: {broken_links}")


if __name__ == "__main__":

    check_dead_links()
