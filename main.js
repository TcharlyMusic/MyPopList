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

// Creating the Results Table
async function CreateTableWithValue(divHtmlItem, value)
{
	let popCounter = 0;
	
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
	str += '<td><b><font color="#000000">Genre</b></td>';
	str += '<td><b><font color="#000000">Type de Pop</b></td>';
	str += '<td><b><font color="#000000">Nom complet</b></td>';
	str += '</tr>';

	// loop on all the item of the Pop List
	for (let i = 0; i < popDatas.length; i++)
	{
		// Get a Item
		let item = popDatas[i];

		// If it's the good Number
		if ((item["Numero"].includes(value) == true) ||
			(item["CodeBarre"].includes(value) == true) ||
			(item["Infos"].includes(value) == true) ||
			(item["NomComplet"].includes(value) == true) ||
			(item["NomComplet"].toUpperCase().includes(value.toUpperCase()) == true))
		{
			// Color of the Row
			if      (item["Infos"] == 'CMD') { str += '<tr style="background-color:skyblue;">';	}
			else if (item["Infos"] == 'REC') { str += '<tr style="background-color:red;">';     }
			else                             { str += '<tr>';                                   }

			// Different row Informations
			str += '<td>' + item["Numero"] + '</td>';
			str += '<td>' + item["CodeBarre"] + '</td>';
			str += '<td>' + item["Infos"] + '</td>';
			str += '<td>' + item["Estimation"] + '</td>';
			str += '<td>' + item["Genre"] + '</td>';
			str += '<td>' + item["TypeDePop"] + '</td>';
			str += '<td>' + item["NomComplet"] + '</td>';
			str += '</tr>';
			str += '</tr>';
			
			// One more Pop
			popCounter++;
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

	// Update the number of Pops
	document.getElementById("numberOfPops").innerHTML = 'Liste des Pops (' + popCounter + '/' + popDatas.length + ')';
}

// Keypress event ? 
document.getElementById('inputPopInfo').addEventListener("keyup", function(event)
{
	// Get the value of the Input
	let value = document.getElementById('inputPopInfo').value;

	// Create the table with the infos
	CreateTableWithValue('divall', value);
});

// Focus on the Input
document.getElementById('inputPopInfo').focus();
