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
function ObjectAlreadyInList(list, str)
{
	for (let i = 0; i < list.length; i++)
	{
		if (list[i] == str) return true;
	}
	return false;
}

async function CreateSelectTypeSearch()
{
	// Starting the HTML section Select
	let str = '<select id="selectTypeSearch">';

	// TypeSearch Options with Ids
	str += '<option id="selectTypeSearchELL" value="ELL">Pops Possédées</option>';
	str += '<option id="selectTypeSearchCMD" value="CMD">Pops Commandées</option>';
	str += '<option id="selectTypeSearchREC" value="REC">Pops Recherchées</option>';
	str += '<option id="selectTypeSearchABM" value="ABM">Pops Abimées</option>';
	str += '<option id="selectTypeSearchMAS" value="HOM">Pops Masculines</option>';
	str += '<option id="selectTypeSearchALL" value="ALL">Toutes les Pops</option>';

	// Ending the HTML section Select
	str += '</select>';

	// Send the Generated Select to the HTML of the DIV
	document.getElementById('divTypeSearchResult').innerHTML = str;
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
async function CreateSelectZones()
{
	// Starting the HTML section Select
	let str = '<select id="selectZone">';

	// Zone Options with Ids
	str += '<option value="ALL">Toutes les Zones</option>';
	str += '<option value="SA1">SA1</option>';
	str += '<option value="SA2">SA2</option>';
	str += '<option value="SA3">SA3</option>';
	str += '<option value="SA4">SA4</option>';
	str += '<option value="SA5">SA5</option>';
	str += '<option value="SA6">SA6</option>';
	str += '<option value="SA7">SA7</option>';
	str += '<option value="SB1">SB1</option>';
	str += '<option value="SB2">SB2</option>';
	str += '<option value="SB3">SB3</option>';
	str += '<option value="SB4">SB4</option>';
	str += '<option value="SB5">SB5</option>';
	str += '<option value="SB6">SB6</option>';
	str += '<option value="SB7">SB7</option>';
	str += '<option value="SC1">SC1</option>';
	str += '<option value="SC2">SC2</option>';
	str += '<option value="SC3">SC3</option>';
	str += '<option value="SC4">SC4</option>';
	str += '<option value="SC5">SC5</option>';
	str += '<option value="SC6">SC6</option>';
	str += '<option value="SC7">SC7</option>';
	str += '<option value="SD1">SD1</option>';
	str += '<option value="SD2">SD2</option>';
	str += '<option value="SD3">SD3</option>';
	str += '<option value="SD4">SD4</option>';
	str += '<option value="SD5">SD5</option>';
	str += '<option value="SD6">SD6</option>';
	str += '<option value="SD7">SD7</option>';

	// Ending the HTML section Select
	str += '</select>';

	// Send the Generated Select to the HTML of the DIV
	document.getElementById('divZoneResult').innerHTML = str;
}

async function CreateTableResults(selectTypeSearchValue, selectLicenseValue, selectZoneValue, inputPopInfoValue)
{
	console.log('CreateTableResults(TypeSearch=' + selectTypeSearchValue + ', License=' + selectLicenseValue + ', Zone=' + selectZoneValue + ', inputPopInfoValue=' + inputPopInfoValue + ')');

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
	str += '<td><b><font color="#000000">Zones</b></td>';
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
					// Good Zone ?
					if (('ALL' == selectZoneValue) || (item["Zone"] == selectZoneValue))
					{
							// Color of the Row
						str += GetRowColor(item);

						// Different row Informations
						str += '<td>' + item["Numero"] + '</td>';
						str += '<td>' + item["CodeBarre"] + '</td>';
						str += '<td>' + item["Zone"] + '</td>';
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
	document.getElementById("selectTypeSearchELL").text = 'Pops Possédées (' + (numberOfPopALL-numberOfPopREC-numberOfPopCMD) + ')';
	document.getElementById("selectTypeSearchCMD").text = 'Pops Commandées (' + numberOfPopCMD + ')';
	document.getElementById("selectTypeSearchREC").text = 'Pops Recherchées (' + numberOfPopREC + ')';
	document.getElementById("selectTypeSearchABM").text = 'Pops Abimées (' + numberOfPopABM + ')';
	document.getElementById("selectTypeSearchMAS").text = 'Pops Masculines (' + numberOfPopMAS + ')';
	document.getElementById("selectTypeSearchALL").text = 'Toutes les Pops (' + numberOfPopALL + ')';

	// Console Estimation Infos
	console.log('Estimation Totale = ' + totalEstimation + ' Euros');
}

async function FullRefresh()
{
	// Get the value of the Select Type
	let selectTypeSearchValue = document.getElementById('selectTypeSearch').value;

	// Repositonning some Values
	/*
	if (selectTypeSearchValue == 'CMD')
	{
		let $select = document.querySelector('#selectLicense');
		let $options = Array.from($select.options);
		let optionToSelect = $options.find(item => item.value === 'ALL');
		optionToSelect.selected = true;
	}
	*/

	// Get the value of the Select License
	let selectLicenseValue = document.getElementById('selectLicense').value;

	// Get the value of the Select Zone
	let selectZoneValue = document.getElementById('selectZone').value;

	// Get the value of the Input
	let inputPopInfoValue = document.getElementById('inputPopInfo').value;

	// Create the table with the infos
	CreateTableResults(selectTypeSearchValue, selectLicenseValue, selectZoneValue, inputPopInfoValue);	
}

async function main()
{
	// Create the Select Type Search
	await CreateSelectTypeSearch();
	
	// Create the Select License
	await CreateSelectLicenses();
	
	// Create the Select Zone
	await CreateSelectZones();
	
	// Events
	document.getElementById('selectTypeSearch').addEventListener("change", FullRefresh);
	document.getElementById('selectLicense').addEventListener("change", FullRefresh);
	document.getElementById('selectZone').addEventListener("change", FullRefresh);
	document.getElementById('inputPopInfo').addEventListener("keyup", FullRefresh);

	// Create the Table result control
	await CreateTableResults('ELL', 'ALL', 'ALL', '');

	// Focus on the Input
	document.getElementById('inputPopInfo').focus();

	// Update the Version Estimation
	document.getElementById("versionOfPops").innerHTML = 'Version 0.9.3';
}

// Main Function
main();
