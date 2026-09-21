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

## Updating BibTeX files
All BibTeX files for the site are located in the [bib directory](https://github.com/sergeitarasov/sergeitarasov.github.io/tree/main/bib). Currently, these files are:

* [publications.bib](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/bib/publications.bib)

### publications.bib
This file contains all of the publications listed on the [Publications page](https://sergeitarasov.github.io/publications.html). The publications are listed on the page in the same order as in the publications.bib file.

## Updating Markdown files
All Markdown files are located in the [md directory](https://github.com/sergeitarasov/sergeitarasov.github.io/tree/main/md). Currently, these files are:

* [attributions.md](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/md/attributions.md)
* [facts-dung-beetles.md](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/md/facts-dung-beetles)
* One Markdown files for each trip, including template files

### attributions.md
This file contains all of the content in the [Attributions page](https://sergeitarasov.github.io/attributions.html), including the following:

* Site design
* Javascript libraries used
* Images used
* Fonts used
* Icons used

A link to the [Attributions page](https://sergeitarasov.github.io/attributions.html) can be found in the footer on each page of the site.

## How to...
### Add a name that should be bolded in a publication citation
Add the name to the **namestobold** list in [all_pages.yaml file](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/all_pages.yaml). Be sure to list every variant of the name in the BibTeX entry/entries (e.g., "forename surname", "surname, forename", with and without middle initial, etc.).

### Add a new feature section to the homepage
To add a new feature section to the [homepage](https://sergeitarasov.github.io/index.html), copy and paste an existing entry in [index.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/index.yaml) file and then update all of the fields for the new feature section. This is the easiest way to achieve the proper formatting and spacing for the YAML file parser. All of the fields are simple strings; simple formatting (e.g., bold, italic) can be specified using HTML tags (e.g., <strong>, <em>) and line breaks can be specified by inserting `<br><br>` into the text.

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

### Add a new trip page
To add a new trip to the [Trips page](https://sergeitarasov.github.io/trips.html)

1. Create a new HTML file in the [trips](https://github.com/sergeitarasov/sergeitarasov.github.io/tree/main/trips) directory with a unique and descriptive name for the trip and hyphens in place of spaces (e.g., madagascar-fossil-hunt-2026.html). Alternatively, you can copy and paste one of any of the HTML files currently in the [trips](https://github.com/sergeitarasov/sergeitarasov.github.io/tree/main/trips) directory and rename it.
2. If you created a new HTML file in the previous step and it is currently empty (i.e., you did not copy and paste an existing file), copy the content below into the new HTML file you created. This is the same content in every HTML file in the [trips](https://github.com/sergeitarasov/sergeitarasov.github.io/tree/main/trips) directory. There is no need to change the content of the HTML file, only the name of the file. All of the HTML files in the [trips](https://github.com/sergeitarasov/sergeitarasov.github.io/tree/main/trips) directory should have exactly the same content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Tarasov Lab</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="js/all_pages_data.js" ></script>
	<link rel="stylesheet" href="css/stylesheet.css">
	<link rel="icon" type="image/png" href="png/favicon-96x96.png" sizes="96x96" />
</head>
<body>
	<div class="main-container" >
		<header></header>
		<main></main>
		<footer></footer>
	</div>
</body>
</html>
```
3. Create a new Markdown file in the [md](https://github.com/sergeitarasov/sergeitarasov.github.io/tree/main/md) directory *with the same name* as the HTML file (except using the file extension .md instead of .html).
4. In this new Markdown file, write the trip entry using Markdown. You can use one of the template trip .md files as a guide. You can write the Markdown file using Github's online editing tools to toggle back and forth between Edit and Preview so you'll have an idea of what the fully formatted Markdown will look like. In standard Markdown, there is no way to indicate image captions, so for that you'll need to use HTML (HTML can always be inserted directly into Markdown). You can use the following HTML to create center aligned text for an image caption:

```html
<p align="center">This will be center aligned text for an image caption.</p>
```

If you'd like to use smaller text for image captions, you can add the class "figcaption" as shown below:

```html
<p align="center" class="figcaption">This will be center aligned text for an image caption.</p>
```

5. Once you've created the HTML and Markdown files for a new trip, you'll need to make sure the new entry shows up on the [Trips page](https://sergeitarasov.github.io/trips.html). To do this, you'll edit the **trips** list in the [all_pages.yaml file](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/all_pages.yaml). Copy and paste one of the trips already listed in the **trips** list (there are a couple templates included) and update all of the values to match the new trip. The fields to update are as follows (all are simple strings, none are Markdown):

* **title**: A simple string for the trip page title
* **name**: A simple string of text that will appear below the title
* **link**: The link to the trip's HTML file including the "trips" directory
* **show_in_trips**: A boolean indicating whether the trip should appear on the [Trips page](https://sergeitarasov.github.io/trips.html). Set this to `true` to show the trip, `false` to hide it.
* **preview_image**: The image that is shown on the [Trips page](https://sergeitarasov.github.io/trips.html)
* **blurb**: The preview text that is shown on the [Trips page](https://sergeitarasov.github.io/trips.html)
* **title_image**: Banner/Title image to use for the specific trip page (not on the [Trips page](https://sergeitarasov.github.io/trips.html))
* **title_image_position_x**: Focal point of banner/title image (lower percentages shift the focal point to the right)
* **title_image_caption**: Caption for banner/title image
* **title_image_caption_link**: Link for caption for banner/title image

### Add a piece of software
To add a new software project to the [Software page](https://sergeitarasov.github.io/software.html), copy and paste an existing entry in the [software.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/software.yaml) file and then update all of the fields for the new piece of software. This is the easiest way to achieve the proper formatting and spacing for the YAML file parser. Be sure to complete each field using the proper format as listed below (order does not matter); note that some fields are optional (also indicated below).

* **name**: Simple string
* **short_description**: Simple string (optional)
* **image**: Link to image
* **github**: Link to software on github (optional)
* **doc_url**: Link to software documentation (optional)
* **authors**: Markdown, using YAML's "Literal Block Scalar" (|) (optional)
* **maintainer**: Markdown, using YAML's "Literal Block Scalar" (|) (optional)
* **publications**: Bibtex entry or entries, using YAML's "Literal Block Scalar" (|) (optional)
* **description**: Markdown, using YAML's "Literal Block Scalar" (|)

### Add a project
To add a new project to the [Projects page](https://sergeitarasov.github.io/projects.html), copy and paste an existing entry in the [projects.yaml](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/projects.yaml) file and then update all of the fields for the new project. This is the easiest way to achieve the proper formatting and spacing for the YAML file parser. Be sure to complete each field using the proper format as listed below (order does not matter); note that some fields are optional (also indicated below).

* **name**: Markdown, using YAML's "Literal Block Scalar" (|)
* **short_description**: Simple string (optional)
* **image**: Link to image
* **image_caption**: Simple string
* **image_caption_link**: Link for image caption
* **image_caption_link_title**: Title for image caption link (text that appears when mouse hovers over link)
* **description**: Markdown, using YAML's "Literal Block Scalar" (|)
* **publications**: BibTeX entry or entries, using YAML's "Literal Block Scalar" (|) (optional)

### Add a new publication
To add a new publication to the [Publications page](https://sergeitarasov.github.io/publications.html), add the publication's BibTeX entry to [publications.bib](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/bib/publications.bib). The publisher's page for a publication typically has an option to export the publication's citation in BibTeX format. Alternatively, if you know the DOI for the publication (usually also found on the publisher's page for that publication), you can use this free [DOI-to-BibTeX tool](https://www.bibtex.com/c/doi-to-bibtex-converter/) to generate the BibTeX entry. The publications are printed on the Publications page in the same order as in the BibTeX file; to reorder any publications, simply cut and paste the corresponding BibTeX entries.

In addition to the standard BibTeX data fields, the following are custom fields that can be added to any entry:

* **predoi**: Any custom text to be included before the DOI/URL of the article
* **pdf**: A link to a downloadable PDF of the publication

### Change the title/banner image for a page
The title or banner image for a page is the rectangular image that appears at the top of the page behind the page title and subtitle. To change this image for a page, upload a new image to one of the image folders (e.g., jpeg, webp) and update the link in the **sitemap** list in [all_pages.yaml file](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/yaml/all_pages.yaml). You can find the link for each page in the **title_image** field; it is given in single quotes wrapped within `url()`.

The image should be compressed as much as possible without significantly compromising the quality (to reduce page load time) and should have a width of 2048 pixels and a height of 612 pixels. Be sure to update the image caption and link to match the new image and to change the value of `title_image_position_x` if you want to shift the focal point of the image toward the left or right (lower percentages shift the focal point to the right, higher percentages shift the focal point to the left).

### Show/Hide a page from the header and footer navigation menus
To show a page, set the property `show_in_nav` for the page in the sitemap to `true` (default). To hide a page, set the property `show_in_nav` for the page in the sitemap to `false`.

### Update the attributions page
To update the [Attributions page](https://sergeitarasov.github.io/attributions.html), edit the Markdown in [attributions.md](https://github.com/sergeitarasov/sergeitarasov.github.io/blob/main/md/attributions.md).
