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

// Creating the Results Table
async function CreateTableWithValue(divHtmlItem, inputPopInfoValue, selectTypeSearchValue)
{
	console.log('CreateTableWithValue(inputPopInfoValue=' + inputPopInfoValue + ', button=' + selectTypeSearchValue + ')');

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

	// Empty starting table
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
			(('MAS' == selectTypeSearchValue) && (item["Genre"] == 'H')) || 
			(item["Infos"] == selectTypeSearchValue)
		)
		{
			// Filtering the Value with the Infos
			if (IsPopMatch(item, inputPopInfoValue) == true)
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
				str += '<td>' + item["NomComplet"] + '</td>';
				str += '</tr>';
				str += '</tr>';
			}
		}

		// Computation Estimation
		if (item["Estimation"] != 'XXXXXX')
		{
			// If it's not a searched Pop
			if (item["Infos"] != 'REC')
			{
				totalEstimation += (parseFloat(item["Estimation"] * 100) / 100);
			}
		}
	}
	
	// Add it to the list
	//str += '<tr>';
	//str += '<td><img src="/ViteProject/images/60100.webp" width="32" height="32" /></td>';
	//str += '</tr>';

	// End of the Table
	str += '</tbody></table>';

	// Send it to the HTML of the DIV
	document.getElementById(divHtmlItem).innerHTML = str;

	// Update the Select Options
	document.getElementById("selectTypeSearchALL").text = 'Toutes les Pops (' + numberOfPopALL + ')';
	document.getElementById("selectTypeSearchELL").text = 'Pops Possédées (' + (numberOfPopALL-numberOfPopREC-numberOfPopCMD) + ')';
	document.getElementById("selectTypeSearchCMD").text = 'Pops Commandées (' + numberOfPopCMD + ')';
	document.getElementById("selectTypeSearchREC").text = 'Pops Recherchées (' + numberOfPopREC + ')';
	document.getElementById("selectTypeSearchABM").text = 'Pops Abimées (' + numberOfPopABM + ')';
	document.getElementById("selectTypeSearchMAS").text = 'Pops Masculines (' + numberOfPopMAS + ')';

	// Update the Version Estimation
	document.getElementById("versionOfPops").innerHTML = 'Version 0.9.0';

	// Console Estimation Infos
	console.log('Estimation Totale = ' + totalEstimation + ' Euros');
}

// Keypress event in the Input ?
document.getElementById('inputPopInfo').addEventListener("keyup", function(event)
{
	// Get the value of the Input
	let inputPopInfoValue = document.getElementById('inputPopInfo').value;

	// Get the value of the Select
	let selectTypeSearchValue = document.getElementById('selectTypeSearch').value;

	// Create the table with the infos
	CreateTableWithValue('divall', inputPopInfoValue, selectTypeSearchValue);
});

// Select choice change ?
document.getElementById('selectTypeSearch').addEventListener("change", function(event)
{
	// Get the value of the Input
	let inputPopInfoValue = document.getElementById('inputPopInfo').value;

	// Get the value of the Select
	let selectTypeSearchValue = document.getElementById('selectTypeSearch').value;

	// Create the table with the infos
	CreateTableWithValue('divall', inputPopInfoValue, selectTypeSearchValue);
});

// Full Refresh
CreateTableWithValue('divall', '', 'ALL');

// Focus on the Input
document.getElementById('inputPopInfo').focus();
