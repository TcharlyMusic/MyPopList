(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))p(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&p(r)}).observe(document,{childList:!0,subtree:!0});function l(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function p(i){if(i.ep)return;i.ep=!0;const s=l(i);fetch(i.href,s)}})();async function m(){return await(await fetch("./datas/datas.json")).json()}function L(e){return e.Infos=="CMD"?'<tr style="background-color:skyblue;">':e.Infos=="REC"?'<tr style="background-color:red;">':e.Infos=="ABM"?'<tr style="background-color:gray;">':e.Infos=="LUC"?'<tr style="background-color:brown;">':e.Genre=="H"?'<tr style="background-color:green;">':"<tr>"}function E(e,n){return e.Numero.includes(n)==!0||e.CodeBarre.includes(n)==!0||e.Infos.includes(n)==!0||e.Infos.toUpperCase().includes(n.toUpperCase())==!0||e.NomComplet.includes(n)==!0||e.NomComplet.toUpperCase().includes(n.toUpperCase())==!0}function C(e,n){for(let l=0;l<e.length;l++)if(e[l]==n)return!0;return!1}async function b(){let e='<select id="selectTypeSearch">';e+='<option id="selectTypeSearchELL" value="ELL">Pops Possédées</option>',e+='<option id="selectTypeSearchCMD" value="CMD">Pops Commandées</option>',e+='<option id="selectTypeSearchREC" value="REC">Pops Recherchées</option>',e+='<option id="selectTypeSearchABM" value="ABM">Pops Abimées</option>',e+='<option id="selectTypeSearchMAS" value="HOM">Pops Masculines</option>',e+='<option id="selectTypeSearchLUC" value="LUC">Pops chez Lucile</option>',e+='<option id="selectTypeSearchALL" value="ALL">Toutes les Pops</option>',e+="</select>",document.getElementById("divTypeSearchResult").innerHTML=e}async function g(){let e=new Array,n=await m();for(let p=0;p<n.length;p++){let i=n[p];i.License!=""&&C(e,i.License)==!1&&e.push(i.License)}e.sort();let l='<select id="selectLicense">';l+='<option value="ALL">Toutes les Licenses</option>';for(let p=0;p<e.length;p++)l+='<option value="'+e[p]+'">'+e[p]+"</option>";l+="</select>",document.getElementById("divLicenseResult").innerHTML=l}async function B(){let e='<select id="selectZone">';e+='<option value="ALL">Toutes les Zones</option>',e+='<option value="SA1">SA1</option>',e+='<option value="SA2">SA2</option>',e+='<option value="SA3">SA3</option>',e+='<option value="SA4">SA4</option>',e+='<option value="SA5">SA5</option>',e+='<option value="SA6">SA6</option>',e+='<option value="SA7">SA7</option>',e+='<option value="SB1">SB1</option>',e+='<option value="SB2">SB2</option>',e+='<option value="SB3">SB3</option>',e+='<option value="SB4">SB4</option>',e+='<option value="SB5">SB5</option>',e+='<option value="SB6">SB6</option>',e+='<option value="SB7">SB7</option>',e+='<option value="SC1">SC1</option>',e+='<option value="SC2">SC2</option>',e+='<option value="SC3">SC3</option>',e+='<option value="SC4">SC4</option>',e+='<option value="SC5">SC5</option>',e+='<option value="SC6">SC6</option>',e+='<option value="SC7">SC7</option>',e+='<option value="SD1">SD1</option>',e+='<option value="SD2">SD2</option>',e+='<option value="SD3">SD3</option>',e+='<option value="SD4">SD4</option>',e+='<option value="SD5">SD5</option>',e+='<option value="SD6">SD6</option>',e+='<option value="SD7">SD7</option>',e+='<option value="SE1">SE1</option>',e+='<option value="SE2">SE2</option>',e+='<option value="SE3">SE3</option>',e+='<option value="SE4">SE4</option>',e+='<option value="SE5">SE5</option>',e+='<option value="SE6">SE6</option>',e+='<option value="SE7">SE7</option>',e+='<option value="SF1">SF1</option>',e+='<option value="SF2">SF2</option>',e+='<option value="SF3">SF3</option>',e+='<option value="SF4">SF4</option>',e+='<option value="SF5">SF5</option>',e+='<option value="SF6">SF6</option>',e+='<option value="SF7">SF7</option>',e+='<option value="SG1">SG1</option>',e+='<option value="SG2">SG2</option>',e+='<option value="SG3">SG3</option>',e+='<option value="SG4">SG4</option>',e+='<option value="SG5">SG5</option>',e+='<option value="SG6">SG6</option>',e+='<option value="SG7">SG7</option>',e+='<option value="SH1">SH1</option>',e+='<option value="SH2">SH2</option>',e+='<option value="SH3">SH3</option>',e+='<option value="SH4">SH4</option>',e+='<option value="SH5">SH5</option>',e+='<option value="SH6">SH6</option>',e+='<option value="SH7">SH7</option>',e+="</select>",document.getElementById("divZoneResult").innerHTML=e}async function y(e,n,l,p){console.log("CreateTableResults(TypeSearch="+e+", License="+n+", Zone="+l+", inputPopInfoValue="+p+")");let i=0,s=0,r=0,u=0,d=0,S=0,f=0,v=await m(),o='<br><table border="1" width="100%"><tbody>';o+='<tr style="background-color:skyblue;">',o+='<td><b><font color="#000000">Numéro</b></td>',o+='<td><b><font color="#000000">Code Barre</b></td>',o+='<td><b><font color="#000000">Zones</b></td>',o+='<td><b><font color="#000000">Infos</b></td>',o+='<td><b><font color="#000000">Estimation</b></td>',o+='<td><b><font color="#000000">Etat</b></td>',o+='<td><b><font color="#000000">Genre</b></td>',o+='<td><b><font color="#000000">Type de Pop</b></td>',o+='<td><b><font color="#000000">License</b></td>',o+='<td><b><font color="#000000">Nom complet</b></td>',o+="</tr>";for(let c=0;c<v.length;c++){let t=v[c];s++,t.Infos=="CMD"&&r++,t.Infos=="REC"&&u++,t.Infos=="ABM"&&d++,t.Infos=="LUC"&&S++,t.Genre=="H"&&f++,(e=="ALL"||e=="ELL"&&(t.Infos==""||t.Infos=="ABM"||t.Infos=="LUC")||e=="HOM"&&t.Genre=="H"||t.Infos==e)&&E(t,p)==!0&&(n=="ALL"||t.License==n)&&(l=="ALL"||t.Zone==l)&&(o+=L(t),o+="<td>"+t.Numero+"</td>",o+="<td>"+t.CodeBarre+"</td>",o+="<td>"+t.Zone+"</td>",o+="<td>"+t.Infos+"</td>",o+="<td>"+t.Estimation+"</td>",o+="<td>"+t.Etat+"</td>",o+="<td>"+t.Genre+"</td>",o+="<td>"+t.TypeDePop+"</td>",o+="<td>"+t.License+"</td>",o+="<td>"+t.NomComplet+"</td>",o+="</tr>",o+="</tr>"),t.Estimation!="XXXXXX"&&t.Infos!="REC"&&(i+=parseFloat(t.Estimation*100)/100)}o+="</tbody></table>",document.getElementById("divTableReult").innerHTML=o,document.getElementById("selectTypeSearchELL").text="Pops Possédées ("+(s-u-r)+")",document.getElementById("selectTypeSearchCMD").text="Pops Commandées ("+r+")",document.getElementById("selectTypeSearchREC").text="Pops Recherchées ("+u+")",document.getElementById("selectTypeSearchABM").text="Pops Abimées ("+d+")",document.getElementById("selectTypeSearchMAS").text="Pops Masculines ("+f+")",document.getElementById("selectTypeSearchLUC").text="Pops chez Lucile ("+S+")",document.getElementById("selectTypeSearchALL").text="Toutes les Pops ("+s+")",console.log("Estimation Totale = "+i+" Euros")}async function a(){let e=document.getElementById("selectTypeSearch").value,n=document.getElementById("selectLicense").value,l=document.getElementById("selectZone").value,p=document.getElementById("inputPopInfo").value;y(e,n,l,p)}async function h(){await b(),await g(),await B(),document.getElementById("selectTypeSearch").addEventListener("change",a),document.getElementById("selectLicense").addEventListener("change",a),document.getElementById("selectZone").addEventListener("change",a),document.getElementById("inputPopInfo").addEventListener("keyup",a),await y("ELL","ALL","ALL",""),document.getElementById("inputPopInfo").focus(),document.getElementById("versionOfPops").innerHTML="Version 0.9.3"}h();