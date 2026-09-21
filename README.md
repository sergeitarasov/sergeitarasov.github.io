# About this site
This Github Pages site combines modern web code (HTML, JavaScript, and CSS) with more human readable data file types (e.g., YAML, Markdown, BibTeX) to deliver a fast, easy-to-update, and professional website. Each time a page is loaded, JavaScript parses any YAML, Markdown, and BibTeX files that contain content for that page and loads that content into the DOM (Document Object Model) to render the page. Any updates to the data files are incorporated into a user's browser on reload, either immediately (without caching) or within the standard 10-minute caching refresh for Github Pages. This site was designed specifically for the Tarasov Lab. This README provides instructions for how contributors to this repository can update the site via the data files.

# Updating this site
Contributors to this repository can easily update the site by editing any of the site's data files and committing the changes. When making updates, if you do not see a change in the site immediately after committing a change you may need to wait for the [pages build and deployment action workflow to finish](https://github.com/sergeitarasov/sergeitarasov.github.io/actions). If you still do not see a change in the site, you may need to turn on developer mode in your browser and turn off caching so that the browser pulls the most recent version of the site.

## Updating YAML files
All YAML files for the site are located in the [YAML directory](https://github.com/sergeitarasov/sergeitarasov.github.io/tree/main/yaml). Currently, these files are:

* [all_pages.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/all_pages.yaml)
* [index.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/index.yaml)
* [people.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/people.yaml)
* [projects.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/projects.yaml)
* [software.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/software.yaml)

### all_pages.yaml
This file contains a **sitemap** list that is used to populate the title, link, subtitle, and title image for each page on the site. The links in **sitemap** are used to set the links in the header and footer navigation menus and must match the HTML files to which they link, including any parent directories. This file also contains a second list, **namestobold**, with every author name that should be bolded when the site parses BibTeX data to print a publication citation. This includes publication lists on the [Publications](https://sergeitarasov.github.io/publications.html), [Projects](https://sergeitarasov.github.io/projects.html), and [Software](https://sergeitarasov.github.io/software.html) pages of the site.

### index.yaml
This file contains all of the content after the page title banner image and before the footer on the [site homepage](https://sergeitarasov.github.io/index.html). Each block of image, text and button is a separate item in a **sections** list.

### people.yaml
This file contains all of the content for the list of the current and former lab members on the [People page](https://sergeitarasov.github.io/people.html). Current and former lab members are listed in two different **status** lists directly under the base level list **labmembers**.

### projects.yaml
This file contains all of the content after the page title banner image and before the footer on the [Projects page](https://sergeitarasov.github.io/projects.html). Each project is a separate item in a **projects** list.

### software.yaml
This file contains all of the content after the page title banner image and before the footer on the [Software page](https://sergeitarasov.github.io/projects.html). Each software project is a separate item in a **software** list.

## How to...
### Add a name that should be bolded in a publication citation
Add the name to the **namestobold** list in [all_pages.yaml file](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/all_pages.yaml). Be sure to list every variant of the name in the BibTeX entry/entries (e.g., "forename surname", "surname, forename", with and without middle initial, etc.).

### Add a new lab member
To add a new person to the [People page](https://sergeitarasov.github.io/people.html), copy and paste an entry for an existing lab member in the [people.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/people.yaml) file and then update all of the fields for the new member. This is the easiest way to achieve the proper formatting and spacing for the YAML file parser. All of the fields are simple strings with the exception of **bio**, which can be written in Markdown. The following are all optional keywords that can be added for a particular individual (order does not matter):

* **email**: Email address
* **scholar**: Link to Google Scholar profile
* **github**: Link to Github profile
* **twitter**: Link to Twitter/X profile
* **cv**: Link to CV (e.g., can be uploaded as a PDF)
* **researchgate**: Link to ResearchGate profile

If any of the above are added, a linked icon is added to that person's profile section.

When adding a new member, you'll also need to upload a new photo. Upload upload a new image to one of the image folders (e.g., jpeg, webp). The image should be square, be between 300x300 and 612x612 pixels in size, and be compressed as much as possible without significantly compromising the quality (to reduce page load time).

The order of people can be changed by changing the order of the entries in the YAML file and people can be removed from the page by simply deleting their entry in the YAML file.

### Add a piece of software
To add a new software project to the [Software page](https://sergeitarasov.github.io/software.html), copy and paste an existing entry and then update all of the fields for the new piece of software. This is the easiest way to achieve the proper formatting and spacing for the YAML file parser. Be sure to complete each field using the proper format as listed below (order does not matter); note that some fields are optional (also indicated below).

* **name**: Simple string
* **short_description**: Simple string (optional)
* **image**: Link to image
* **github**: Link to software on github (optional)
* **doc_url**: Link to software documentation (optional)
* **authors**: Markdown, using YAML's "Literal Block Scalar" (|) (optional)
* **maintainer**: Markdown, using YAML's "Literal Block Scalar" (|) (optional)
* **publications**: Bibtex entry or entries, using YAML's "Literal Block Scalar" (|) (optional)
* **description**: Markdown, using YAML's "Literal Block Scalar" (|)

### Change the title/banner image for a page
The title or banner image for a page is the rectangular image that appears at the top of the page behind the page title and subtitle. To change this image for a page, upload a new image to one of the image folders (e.g., jpeg, webp) and update the link in the **sitemap** list in [all_pages.yaml file](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/all_pages.yaml). The image should be compressed as much as possible without significantly compromising the quality (to reduce page load time) and should have a width of 2048 pixels and a height of 612 pixels. Be sure to update the image caption and link to match the new image and to change the value of 'title_image_position_x' if you want to shift the focal point of the image toward the left or right (lower percentages shift the focal point to the right, higher percentages shift the focal point to the left).

### Show/Hide a page from the header and footer navigation menus
To show a page, set the property 'show_in_nav' for the page in the sitemap to 'true' (default). To hide a page, set the property 'show_in_nav' for the page in the sitemap to 'false'.
