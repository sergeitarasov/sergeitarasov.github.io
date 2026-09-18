//
var debug = false;

// Files to be loaded. Files will load in order added to the array
var ljs_libry_to_load = 0; 		// Javascript library files to load (this is just integer count, not array)
var bib_files_to_load = []; 	// Bibtex files to load
var ljs_files_to_load = []; 	// Local (non library) javascript files to load
var mdn_files_to_load = []; 	// Markdown files to load
var yml_files_to_load = []; 	// Yaml files to load
var ljs_load_called = false; 	// Variable to track whether the local page writing javascript files have been called (so they're not called twice)

// Global variable for all loaded data
let bibData = {};
let mdData = {};
let yamlData = {};

// Get current page URL
let webpage_type;
let webpage_file;
let subpage_name;
let webpage_level = '';

const currentUrl = window.location.href;
const currentUrlSplit = currentUrl.split("/");

if(currentUrlSplit.length == 5){

	// For particular trip pages
	webpage_type = currentUrlSplit.at(-2);

	// Subpage
	subpage_name = currentUrlSplit.at(-1).split(".")[0];
	webpage_file = currentUrlSplit.at(-1);

	// Get page type level
	webpage_level = '../';

}else if(currentUrlSplit.length == 4){

	if(currentUrlSplit.at(-1) == ""){
		// Current page is index but without explicit 'index.html' in URL
		webpage_type = 'index';
		webpage_file = 'index.html';
	}else{
		webpage_type = currentUrlSplit.at(-1).split(".")[0];
		webpage_file = currentUrlSplit.at(-1);
	}
}

// Files to load for each page
if(webpage_type == 'attributions' || webpage_type == 'facts-dung-beetles'){
	mdn_files_to_load.push('md/' + webpage_type + '.md');
}else if(webpage_type == 'index'){
	ljs_files_to_load.push('js/index.js');
	yml_files_to_load.push('yaml/index.yaml');
}else if(webpage_type == 'people'){
	ljs_files_to_load.push('js/people.js');
	yml_files_to_load.push('yaml/people.yaml');
}else if(webpage_type == 'projects'){
	yml_files_to_load.push('yaml/projects.yaml');
	ljs_files_to_load.push('js/publications.js'); // For parsing bibtex in projects.yaml
	ljs_files_to_load.push('js/projects.js');
}else if(webpage_type == 'publications'){
	bib_files_to_load.push('bib/publications.bib');
	ljs_files_to_load.push('js/publications.js');
}else if(webpage_type == 'software'){
	ljs_files_to_load.push('js/software.js');
	ljs_files_to_load.push('js/publications.js'); // For parsing bibtex in software.yaml
	yml_files_to_load.push('yaml/software.yaml');
}else if(webpage_type == 'trips' && subpage_name == undefined){
	ljs_files_to_load.push('js/trips.js');
}else if(webpage_type == 'trips' && subpage_name != undefined){
	mdn_files_to_load.push(webpage_level + 'md/' + subpage_name + '.md');
}

// Files to load on all site pages
ljs_files_to_load.push(webpage_level + 'js/all_pages_content.js');
yml_files_to_load.push(webpage_level + 'yaml/all_pages.yaml');

// Start load counts at zero
var ljs_libry_load_ct = 0;
var bib_files_load_ct = 0;
var ljs_files_load_ct = 0;
var mdn_files_load_ct = 0;
var yml_files_load_ct = 0;

// Load a particular md file
function loadMdFile(src, total_md_files) {

	fetch(src)
		.then(response => response.text()) // Get the file content as text
		.then(markdownText => {

			// Once the text is loaded, use the Marked library to parse it
			try {

				// Get name of file
				const baseName = src.split('/').pop(); 
				const fileNameWithoutExt = baseName.substring(0, baseName.lastIndexOf('.'));

				// Parse the markdown as HTML
				marked_parsed = marked.parse(markdownText);
				
				// Sanitize the output HTML
				mdData[fileNameWithoutExt] = DOMPurify.sanitize(marked_parsed);
				
				// Increase count of markdown files that are loaded
				mdn_files_load_ct++;

				// Check if all data files are loaded
				isAllDataLoaded()

			} catch (e) {
				console.error("Error parsing Markdown:", e);
			}
		})
		.catch(error => {
			console.error("Error fetching the Markdown file:", error);
		});
}

// Function to load markdown parser and data
function loadMdParserAndData(scriptSrc, loadAsync, dataFiles) {

	const total_md_files = dataFiles.length;
	const script = document.createElement('script');
	script.src = scriptSrc;

	// What to do once script is loaded
	script.onload = () => {

		// Increase count of javascript library files loaded
		ljs_libry_load_ct++;
		
		// Loop through the array and load each markdown file
		dataFiles.forEach(src => {
			loadMdFile(src, total_md_files);
		});

		// Check if all data files are loaded
		isAllDataLoaded();
	};

	script.async = loadAsync;
	document.head.appendChild(script);
}

// Load Markdown parsing functions and Markdown data
ljs_libry_to_load++;
loadMdParserAndData(webpage_level + 'js/marked_and_purify.js', true, mdn_files_to_load);

// Load a particular yaml file
function loadYaml(src) {

	fetch(src)
		.then(response => response.text()) // Get the file content as text
		.then(yamlText => {
		  // Once the text is loaded, use the jsyaml library to parse it
			try {

				// Get name of file
				const baseName = src.split('/').pop(); 
				const fileNameWithoutExt = baseName.substring(0, baseName.lastIndexOf('.'));

				// Add data as a global variable so that any function can access it
				yamlData[fileNameWithoutExt] = jsyaml.load(yamlText);

				// Increase count of files that are loaded
				yml_files_load_ct++;

				// Check if all data files are loaded
				isAllDataLoaded()

			} catch (e) {
				console.error("Error parsing YAML:", e);
			}
		})
		.catch(error => {
			console.error("Error fetching the YAML file:", error);
		});
}

// Function to load yaml parser and data
function loadYamlParserAndData(scriptSrc, loadAsync, dataFiles) {

	const script = document.createElement('script');
	script.src = scriptSrc;

	// What to do once script is loaded
	script.onload = () => {

		// Increase count of javascript library files loaded
		ljs_libry_load_ct++;

		// Loop through the array and load each markdown file
		dataFiles.forEach(src => {
			loadYaml(src);
		});

		// Check if all data files are loaded
		isAllDataLoaded();
	};

	script.async = loadAsync;
	document.head.appendChild(script);
}

// Load yaml parsing library and yaml data
ljs_libry_to_load++;
loadYamlParserAndData(webpage_level + 'js/yaml.js', true, yml_files_to_load);

function convertCharFromBibTeX(bibtexText) {
  if (!bibtexText) return '';

  let result = bibtexText;

  // 1. Map common BibTeX escaped patterns back to Unicode characters
  const bibtexMap = {
    '{\\\'a}': 'á', '{\\\'e}': 'é', '{\\\'i}': 'í', '{\\\'o}': 'ó', '{\\\'u}': 'ú',
    '{\\\'A}': 'Á', '{\\\'E}': 'É', '{\\\'I}': 'Í', '{\\\'O}': 'Ó', '{\\\'U}': 'Ú',
    '{\\\`a}': 'à', '{\\\`e}': 'è', '{\\\`i}': 'ì', '{\\\`o}': 'ò', '{\\\`u}': 'ù',
    '{\\\`A}': 'À', '{\\\`E}': 'È', '{\\\`I}': 'Ì', '{\\\`O}': 'Ò', '{\\\`U}': 'Ù',
    '{\\\"a}': 'ä', '{\\\"e}': 'ë', '{\\\"i}': 'ï', '{\\\"o}': 'ö', '{\\\"u}': 'ü',
    '{\\\"A}': 'Ä', '{\\\"E}': 'Ë', '{\\\"I}': 'Ï', '{\\\"O}': 'Ö', '{\\\"U}': 'Ü',
    '{\\\^a}': 'â', '{\\\^e}': 'ê', '{\\\^i}': 'î', '{\\\^o}': 'ô', '{\\\^u}': 'û',
    '{\\\^A}': 'Â', '{\\\^E}': 'Ê', '{\\\^I}': 'Î', '{\\\^O}': 'Ô', '{\\\^U}': 'Û',
    '{\\\~n}': 'ñ', '{\\\~o}': 'õ', '{\\\~a}': 'ã',
    '{\\\~N}': 'Ñ', '{\\\~O}': 'Õ', '{\\\~A}': 'Ã',
    '{\\\c{c}}': 'ç', '{\\\c{C}}': 'Ç', '{\\\ss}': 'ß',
    '{\\\o}': 'ø', '{\\\O}': 'Ø', '{\\\aa}': 'å', '{\\\AA}': 'Å'
  };

  // Replace macro patterns
  for (const [escape, unicode] of Object.entries(bibtexMap)) {
    result = result.replaceAll(escape, unicode);
  }

  // 2. Unescape structural syntax signs
  result = result
    .replace(/\\([&%$#_{}])/g, '$1')
    .replace(/\\textasciitilde\{\}/g, '~')
    .replace(/\\textasciicircum\{\}/g, '^')
    .replace(/\\textbackslash\{\}/g, '\\');

  responding  = "\href{https://doi.org/10.1126/science.aav3218}{Blasi et al. 2019}",
 
  result = result
  	.replace(/\\href{(.*?)}{(.*?)}/g, '<a href="$1" target="_blank">$2</a>')  // 
  	.replace(/&lt;(.*?)&gt;/g, '<$1>');  // Replace &lt;...&gt; with <...>

  return result;
}

function cleanString(str) {
	
	var return_str = str;
	
	// Remove white space from beginning and end
	return_str = return_str.trim();
	
	// Remove , at the end of value strings
	return_str = return_str.replace(/,$/, '');
	
	// Remove curly brackets at beginning and end of string
	return_str = return_str.replace(/^[{"]|["}]$/g, '');

	// Remove ", at the end of value strings
	return_str = return_str.replace(/",$/, '');

	// Remove extra \ that is sometimes present in bibtex entries
	return_str = return_str.replace(/\\'\\/g, "\\'");
	
	// Convert Bibtex characters
	return_str = convertCharFromBibTeX(return_str);
	
	return return_str;	
}

function parseBibTeX(bibText) {
    const entries = [];
    const lines = bibText.split(/\r?\n/);
    let currentEntry = null;
    let currentField = null;
    let currentValue = '';

    for (const line of lines) {
        const trimmed = line.trim();

        // Skip comments and empty lines
        if (!trimmed || trimmed.startsWith('%')) continue;

        // Start of a new entry (e.g., @article{key, ...})
        if (trimmed.startsWith('@')) {
            if (currentEntry) entries.push(currentEntry);
            const match = trimmed.match(/^@([a-zA-Z0-9]+)\s*\{\s*([^,\s]+)\s*,/);
            
            if (match) {
                currentEntry = {
                    type: match[1].toLowerCase(),
                    key: match[2],
                    fields: {}
                };
            }
            continue;
        }

        // Closing brace for an entry
        if (trimmed === '}') {
            if (currentEntry) {
                if (currentField && currentValue) {
                    currentEntry.fields[currentField] = cleanString(currentValue);
                }
                entries.push(currentEntry);
                currentEntry = null;
                currentField = null;
                currentValue = '';
            }
            continue;
        }

        // If an entry is active, parse its fields
        if (currentEntry) {
            // Field definition (e.g., author = {Name},)
            if (trimmed.includes('=')) {
                if (currentField && currentValue) {
                    currentEntry.fields[currentField] = cleanString(currentValue);
                }
                const parts = trimmed.split('=');
                currentField = parts[0].trim().toLowerCase();
                currentValue = parts.slice(1).join('=').trim();
            } else {
                // Continuation of a multi-line field
                currentValue += ' ' + trimmed;
            }
        }
    }

    return entries;
}

// Load a particular bibtex file
function loadBib(src) {

	fetch(src)
		.then(response => response.text()) // Get the file content as text
		.then(bibText => {

			// Once the text is loaded, use the citation library to parse it
			try {
			
				// Get name of file
				const baseName = src.split('/').pop(); 
				const fileNameWithoutExt = baseName.substring(0, baseName.lastIndexOf('.'));

				// Parse the bibtex
				bibData[fileNameWithoutExt] = parseBibTeX(bibText);
				
				// Increase count of markdown files that are loaded
				bib_files_load_ct++;

				// Check if all data files are loaded
				isAllDataLoaded()

			} catch (e) {
				console.error("Error parsing Bibtex:", e);
			}
		})
		.catch(error => {
			console.error("Error fetching the Bibtex file:", error);
		});
}

// Loop through the array and load each markdown file
bib_files_to_load.forEach(src => {
	loadBib(src);
});

// What to do once all of the internal scripts and window content are loaded
// Since the internal scripts are only loaded once the window is done loading (because of 
//	the defer property), this function should be called once all internal scripts are 
//	loaded and all window content is loaded
function onAllInternalScriptLoad() {

	showBodyContent();
};

// Load a particular javascript file
function loadScript(src, loadAsync, external) {

	const script = document.createElement('script');
	script.src = src;
	
	if(loadAsync == false){
		script.defer = true;
		script.async = loadAsync;
	}else{
		script.async = loadAsync;
	}

	// What to do once script is loaded
	script.onload = () => {

		// Increase count of files that are loaded, if counting this file
		if(external){
		}else{
			ljs_files_load_ct++;
		}

		// Check if all counted scripts are loaded
		if(ljs_files_load_ct == ljs_files_to_load.length){
			onAllInternalScriptLoad();
			ljs_files_load_ct = 0;
		}
	};
	script.onerror = function() {
		console.error(`Failed to load the script: ${this.src}`);
	};

	document.head.appendChild(script);
}

// What to do once all content files are loaded
function isAllDataLoaded() {

	if(debug) console.log('isAllDataLoaded() called');
	if(debug) console.log('\t' + ljs_libry_load_ct + ' of ' + ljs_libry_to_load + ' javascript library file(s) loaded');
	if(debug) console.log('\t' + mdn_files_load_ct + ' of ' + mdn_files_to_load.length + ' markdown file(s) loaded');
	if(debug) console.log('\t' + yml_files_load_ct + ' of ' + yml_files_to_load.length + ' yaml file(s) loaded');
	if(debug) console.log('\t' + bib_files_load_ct + ' of ' + bib_files_to_load.length + ' bibtex file(s) loaded');

	if(ljs_libry_load_ct < ljs_libry_to_load) return;
	if(mdn_files_load_ct < mdn_files_to_load.length) return;
	if(yml_files_load_ct < yml_files_to_load.length) return;
	if(bib_files_load_ct < bib_files_to_load.length) return;
	if(ljs_load_called){
		if(debug) console.log('Page writing javascript loading functions have already been called');
		return; // So that the page writing javascript files are not loaded twice
	}

	if(debug) console.log('All script and data files are loaded');

	// Set load call to true
	ljs_load_called = true;

	// Loop through the array and load each script
	ljs_files_to_load.forEach(src => {
		loadScript(src, false, false);
	});
}

function showBodyContent() {

	// Delay the visibility of page content so that javascript changes to DOM have
	// time to take effect before rendering. This prevents flashes of incompletely 
	// styled content
	
	// It should not be necessary to use a delayDuration greater than 0 because this 
	// function should only be called once all content and scripts have been loaded
	
	// But if there is any persisting lag in loading the content, this is a last resort 
	// stop gap that can give the page additional time to load content before final display
	const delayDuration = 0;

	if(debug) console.log('showBodyContent() called' + Date.now());

	setTimeout(() => {

		if(debug) console.log('setTimeout complete within showBodyContent()' + Date.now());

		// This code runs after the specified delay
		// Set display for the div with id 'content' to 'block' (default) to remove 'hidden' value
		const body = document.getElementsByTagName('body')[0];
		body.setAttribute('style', 'display:block !important');

	}, delayDuration);
}