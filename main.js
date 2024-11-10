import './style.css'

function PopData_NotAsync()
{
	// Loading Pop Datas
	let popList = [{ "Numero":"SE",   "CodeBarre":"60100", "Infos":"",   "Estimation":"010.90", "Genre":"F", "TypeDePop":"Pops!",            "NomComplet":"Yara Flor (Future State)" }];
	return popList;
}

async function PopData_Async()
{
	// Fetch the data file
	let response = await fetch('./datas/datas.json');

	// Get the response data as JSON
	let jsonDatas = await response.json();
	
	// return the datas
	return jsonDatas;
}
function GetRowColor(item)
{
	if (item["Infos"] == 'CMD')		return '<tr style="background-color:skyblue;">';
	if (item["Infos"] == 'REC')		return '<tr style="background-color:red;">';
	if (item["Infos"] == 'ABM')		return '<tr style="background-color:gray;">';
	if (item["Genre"] == 'H')		return '<tr style="background-color:green;">';
	return '<tr>';
}
function IsPopMatch(item, inputPopInfoValue)
{
	if ((item["Numero"].includes(inputPopInfoValue) == true) ||
		(item["CodeBarre"].includes(inputPopInfoValue) == true) ||
		(item["Infos"].includes(inputPopInfoValue) == true) ||
		(item["Infos"].toUpperCase().includes(inputPopInfoValue.toUpperCase()) == true) ||
		(item["NomComplet"].includes(inputPopInfoValue) == true) ||
		(item["NomComplet"].toUpperCase().includes(inputPopInfoValue.toUpperCase()) == true))
		return true;
	return false;
}

async function CreateSelectTypeSearch()
{
	// Starting the HTML section Select
	let str = '<select id="selectTypeSearch">';

	// TypeSearch Options with Ids
	str += '<option id="selectTypeSearchALL" value="ALL">Toutes les Pops</option>';
	str += '<option id="selectTypeSearchELL" value="ELL">Pops Présentées</option>';
	str += '<option id="selectTypeSearchCMD" value="CMD">Pops Commandées</option>';
	str += '<option id="selectTypeSearchREC" value="REC">Pops Recherchées</option>';
	str += '<option id="selectTypeSearchABM" value="ABM">Pops Abimées</option>';
	str += '<option id="selectTypeSearchMAS" value="HOM">Pops Masculines</option>';

	// Ending the HTML section Select
	str += '</select>';

	// Send the Generated Select to the HTML of the DIV
	document.getElementById('divTypeSearchResult').innerHTML = str;
}
function ObjectAlreadyInList(list, str)
{
	for (let i = 0; i < list.length; i++)
	{
		if (list[i] == str) return true;
	}
	return false;
}

async function CreateSelectLicenses()
{
	// Empty list of Licenses
	let licenseList = new Array();

	// Get the Pop List
	let popDatas = await PopData_Async();

	// loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];

		// If the License exist
		if (item["License"] != '')
		{
			// If the License is not in the List
			if (ObjectAlreadyInList(licenseList, item["License"]) == false)
			{
				// Add it
				licenseList.push(item["License"]);
			}				
		}
	}
	
	// Ordering by alphabetic
	licenseList.sort();
	
	// Starting the HTML section Select
	let str = '<select id="selectLicense">';

	// 1st Option : ALL
	str += '<option value="ALL">Toutes les Licenses</option>';

	// loop on all the Licenses found
	for (let i = 0; i < licenseList.length; i++)
	{
		// Generate the License Select
		str += '<option value="' + licenseList[i] + '">' + licenseList[i] + '</option>';
	}
	
	// Ending the HTML section Select
	str += '</select>';

	// Send the Generated Select to the HTML of the DIV
	document.getElementById('divLicenseResult').innerHTML = str;
}

async function CreateTableResults(inputPopInfoValue, selectTypeSearchValue, selectLicenseValue)
{
	console.log('CreateTableResults(inputPopInfoValue=' + inputPopInfoValue + ', TypeSearch=' + selectTypeSearchValue + ', License=' + selectLicenseValue + ')');

	// Init
	let totalEstimation = 0.0;
	let numberOfPopALL = 0;
	let numberOfPopCMD = 0;
	let numberOfPopREC = 0;
	let numberOfPopABM = 0;
	let numberOfPopMAS = 0;

	// Loading Pop File
	//let popDatas = PopData_NotAsync();
	let popDatas = await PopData_Async();

	// Starting the HTML section Table
	let str = '<br><table border="1" width="100%"><tbody>';

	// Add it to the list
	str += '<tr style="background-color:skyblue;">';
	str += '<td><b><font color="#000000">Numéro</b></td>';
	str += '<td><b><font color="#000000">Code Barre</b></td>';
	str += '<td><b><font color="#000000">Infos</b></td>';
	str += '<td><b><font color="#000000">Estimation</b></td>';
	str += '<td><b><font color="#000000">Etat</b></td>';
	str += '<td><b><font color="#000000">Genre</b></td>';
	str += '<td><b><font color="#000000">Type de Pop</b></td>';
	str += '<td><b><font color="#000000">License</b></td>';
	str += '<td><b><font color="#000000">Nom complet</b></td>';
	str += '</tr>';

	// loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];

		// Pop Counting
		numberOfPopALL++;
		if (item["Infos"] == 'CMD') numberOfPopCMD++;
		if (item["Infos"] == 'REC') numberOfPopREC++;
		if (item["Infos"] == 'ABM') numberOfPopABM++;
		if (item["Genre"] == 'H') numberOfPopMAS++;

		// Depends of the Select ?
		if
		(
			('ALL' == selectTypeSearchValue) || 
			(('ELL' == selectTypeSearchValue) && ((item["Infos"] == '') || (item["Infos"] == 'ABM'))) || 
			(('HOM' == selectTypeSearchValue) && (item["Genre"] == 'H')) || 
			(item["Infos"] == selectTypeSearchValue)
		)
		{
			// Filtering the Value with the Infos
			if (IsPopMatch(item, inputPopInfoValue) == true)
			{
				// Good License ?
				if (('ALL' == selectLicenseValue) || (item["License"] == selectLicenseValue))
				{
					// Color of the Row
					str += GetRowColor(item);

					// Different row Informations
					str += '<td>' + item["Numero"] + '</td>';
					str += '<td>' + item["CodeBarre"] + '</td>';
					str += '<td>' + item["Infos"] + '</td>';
					str += '<td>' + item["Estimation"] + '</td>';
					str += '<td>' + item["Etat"] + '</td>';
					str += '<td>' + item["Genre"] + '</td>';
					str += '<td>' + item["TypeDePop"] + '</td>';
					str += '<td>' + item["License"] + '</td>';
					str += '<td>' + item["NomComplet"] + '</td>';
					str += '</tr>';
					str += '</tr>';
				}
			}
		}

		// Computation Estimation
		if (item["Estimation"] != 'XXXXXX') { if (item["Infos"] != 'REC') { totalEstimation += (parseFloat(item["Estimation"] * 100) / 100); }}
	}
	
	// Add it to the list
	//str += '<tr>';
	//str += '<td><img src="/ViteProject/images/60100.webp" width="32" height="32" /></td>';
	//str += '</tr>';

	// Ending the HTML section Table
	str += '</tbody></table>';

	// Send the generated Table to the HTML of the DIV
	document.getElementById('divTableReult').innerHTML = str;

	// Update the Select Options
	document.getElementById("selectTypeSearchALL").text = 'Toutes les Pops (' + numberOfPopALL + ')';
	document.getElementById("selectTypeSearchELL").text = 'Pops Possédées (' + (numberOfPopALL-numberOfPopREC-numberOfPopCMD) + ')';
	document.getElementById("selectTypeSearchCMD").text = 'Pops Commandées (' + numberOfPopCMD + ')';
	document.getElementById("selectTypeSearchREC").text = 'Pops Recherchées (' + numberOfPopREC + ')';
	document.getElementById("selectTypeSearchABM").text = 'Pops Abimées (' + numberOfPopABM + ')';
	document.getElementById("selectTypeSearchMAS").text = 'Pops Masculines (' + numberOfPopMAS + ')';

	// Console Estimation Infos
	console.log('Estimation Totale = ' + totalEstimation + ' Euros');
}

async function FullRefresh()
{
	// Get the value of the Input
	let inputPopInfoValue = document.getElementById('inputPopInfo').value;

	// Get the value of the Select Type
	let selectTypeSearchValue = document.getElementById('selectTypeSearch').value;

	// Get the value of the Select License
	let selectLicenseValue = document.getElementById('selectLicense').value;

	// Create the table with the infos
	CreateTableResults(inputPopInfoValue, selectTypeSearchValue, selectLicenseValue);	
}

async function main()
{
	// Create the Select Type Search
	await CreateSelectTypeSearch();
	
	// Create the Select License
	await CreateSelectLicenses();
	
	// Events
	document.getElementById('selectTypeSearch').addEventListener("change", FullRefresh);
	document.getElementById('selectLicense').addEventListener("change", FullRefresh);
	document.getElementById('inputPopInfo').addEventListener("keyup", FullRefresh);

	// Create the Table result control
	await CreateTableResults('', 'ALL', 'ALL');

	// Focus on the Input
	document.getElementById('inputPopInfo').focus();

	// Update the Version Estimation
	document.getElementById("versionOfPops").innerHTML = 'Version 0.9.1';
}

// Main Function
main();
