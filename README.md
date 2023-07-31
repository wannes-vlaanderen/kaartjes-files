# kaartjes-files
Dit document bevat meer informatie over het wat en hoe van het maken van klikbare kaartjes

### Inleiding
Voor een zeer uitgebreide tutorial, met foto's enzo, kijk dan zeker even de tutorial van Benjamin na. Hierin worden een hoop basisprincipes overlopen, zoals het maken van de kaart in mapbox, etc.  
In dit document wordt meer ingegaan op de features in de code.

De code die ik gebruik is gebaseerd op de code van Benjamin, in de eerste plaats werd mij gevraagd wat extra features toe te voegen, en ook soms dingen weg te laten. Ik heb besloten de code op te splitsen in meerdere files, die je naargelang van wat je nodig hebt, kunt toevoegen of weglaten.:

Alle nodige files vind je terug [hier](https://github.com/wannes-vlaanderen/kaartjes-files).

### Basiscode
De basiscode laad een map in, waarop klikbare bolletjes komen, die u een tekstballontje geven met meer info over de locatie.

### Uitbereidingen
- Sidebar: een venstertje aan de zijkant, waarin een titel, beschrijving, en een lijst met de locaties in kan komen
- Filters: enkel te combineren met de sidebar. Een knop wordt toegevoegd, waarmee men filters kan instellen.
- Legende: een mogelijkheid tot het plaatsen van een legende op je kaart, ook het logo van Vlaanderen is omgeving kan hiermee geplaatst worden
- AdvancedFilters: het aan en uitzetten van sommige filters laat vlakjes weg op de kaart.

### Tutorials
Alle informatie voor het programma wordt meegegeven in 1 variabele, de config. De basisconfig ziet er als volgt uit:
```js
const config = {
  style: 'mapbox://styles/USERNAME/STYLE_ID',
  accessToken: 'TOKEN',
  CSV: 'CSV_FILE',
  center: [LONG, LAT],
  zoom: ZOOM,
  popupInfo: ['PLAATS_TITEL'],
  popupInfo2: ['PLAATS_LINK'],
  popupInfo3: ['PLAATS_BESCHRIJVING'],
  tabTitle: "TABTITEL"
};
```
tutorial voor [mapbox](#mapbox)  
tutorial voor [csv](#csv)

De velden style, accessToken en CSV worden later besproken. 

Center is plaats waar uw map op focust als je de site laad, hierdoor is het mogelijk om niet altijd midden op vlaanderen uit te komen. De zoom bepaald hoe ver je bent ingezoomd.

De 3 popup velden worden gebruikt in de tekstballonetjes, de titel komt bovenaan in het vet, de link komt achter een link object 'Meer Info'. En de beschrijving komt ertussenin. De code gaat deze informatie opzoeken in de csv, je vult hier kolomtitels in, het is hoofdlettergevoelig.

Tabtitel is hetgeen bovenaan in uw tabblad info komt te staan.

#### Hosten van de website
Voor het hosten van de website wordt gebruik gemaakt van github pages. Een voorbeeld vind je [hier](https://www.github.com/wannes-vlaanderen/poort-west-limburg).

Zoals je ziet plaats je gewoon alle files op een hoopje in de hoofdmap. Daarna moet je [github pages](https://pages.github.com/) aanzetten.  
tutorial voor [github pages](#github-pages)


#### Sidebar
De sidebar laat toe wat extra algemene informatie mee te geven, samen met een oplijsting van alle aangeduide plaatsen.

Je config moet je uitbereiden met volgende velden:
```js
  title: 'TITLE',
  description: 'BESCHRIJVING',
  sideBarInfo: ['PLAATS_TITEL','PLAATS_INFO']
```
De titel wordt bovenaan in het groot en vet meegegeven, de beschrijving komt daaronder te staan.  
De sideBarInfo wordt gebruikt voor het oplijsten van alle aangeduide locaties. Opnieuw moet je hier kolomheaders gebruiken voor de data.
'PLAATS_INFO' is optioneel, als je een gewone oplijsting van alle locaties wilt, laat je dit leeg, eg.
```js
  title: 'Gebiedsprogramma\nGenk-Zuid',
  description: 'ENA Gebiedsprogramma rond het ontsluiten van het industrieterrein Genk-Zuid',
  sideBarInfo: ['Naam']
```
Voor het toevoegen van de sidebar voeg je volgende code toe in main.js
```js
createSidebar();
```

#### Filters
Filters laten u toe om op bepaalde eigenschappen van uw plaatsen te filteren. Bij ENA werd dit gebruikt om een onderscheid te maken tussen bestaande bedrijventerreinen, nieuwe bedrijventerreinen en infrastructuurprojecten. Ook bestond een filter op gemeente.  
Het instellen van een filter zal ervoor zorgen dat zowel de lijst op de zijkant, als de bolletjes op de kaart, zullen worden upgedated naar de instelling van de filter.  
Merk op: het gebruik van filters zonder sidebar is niet mogelijk.  
Bereid de config verder uit met volgende velden
```js
  filters: []
```
Een voorbeeld wordt hieronder gegeven voor checkbox, dropdown is volledig analoog, behalve dat type op dropdown wordt gezet.
```js
  filters: [
    {
      type: "checkbox",
      title: "FILTERTITEL",
      columnHeader: "KOLOMTITEL",
      listItems: [
        "ITEM1",
        "ITEM2",
        "ITEM3",
        "ITEM4",
      ]
    },
  ]
```
Merk op: je moet alle items opsommen, ik heb geen tijd genomen om uit te zoeken hoe ik dat automatisch kan fixen  
Merk op: de kolomtitel is hoofdlettergevoelig  
Merk op: je kan een plaats in meerdere categorieën indelen door in 1 cel op de csv, door een komma gescheiden meerdere waarden mee te geven, eg. Antwerpen, Wommelgem, Ranst // zal getoond worden als Antwerpen, Wommelgem of Ranst wordt geselecteerd.

Naast het instellen van de config, moet je ook volgende functie oproepen:
```js
setupFilters(config.filters);
```

#### Legende
Legende zorgt voor twee toevoegingen, ten eerste het logo [vlaanderen is omgeving](https://assets.vlaanderen.be/image/upload/widgets/vlaanderen-is-omgeving-logo.svg) op de kaart te plaatsen en verder de mogelijkheid voor een legende op de kaart te zetten.  
Legende werkt zonder extra toevoegingen, bereid config uit met volgende velden.
```js
  legende: {
    "#e8da11": "Nieuw bedrijventerrein",
    "red": "Infrastructuurproject"
  }
```
Voor de dubbele punt zet je een kleur dat kan worden meegegeven in css, [standaard kleuren in css](https://www.w3schools.com/cssref/css_colors.php) of een hex code.  
Na de dubbele punt zet je meer info over het kleur.

Voor het toevoegen van de legende, laad je dus legende.js in `<script src="legende.js">` en moet je verder nog wat code toevoegen:
```js
map.addControl(new LogoVlaanderen(), "top-left");
map.addControl(new Legenda(config.legende), "top-right");
```
Je kan top-left en top-right aanpassen om het op een andere plaats op de kaart te krijgen.

#### AdvancedFilters
Momenteel is dit nog niet mogelijk om in de config mee te geven, een voorbeeld van waar filters vlakken laten verdwijnen kan je [hier](https://github.com/wannes-vlaanderen/strategische-projecten) terugvinden, de voorbeeldsite is [hier](https://wannes-vlaanderen.github.io/strategische-projecten/). Merk op dat de code hiervan maar gewoon allemaal samen in 1 file staat.

## Mapbox
Mapbox is een tool die toelaat om lagen te plotten over een bestaande stijl. Voor het maken van een mapbox kaart, wordt hieronder een zeer beknopt stappenplan gegeven. Opnieuw kan hier worden verwezen naar de tutorial die Benjamin al uitscheef (vandaar de beknoptheid).

- Maak een account aan op mapbox
- Ga naar [mapbox studio](https://studio.mapbox.com/)
- Klik op stijl toevoegen. (new style)
- Ga naar upload style, en kies "style.json" (hier in de repo).
- Klik ok
- Je krijg nu de kaart te zien, mooie kaart van de wereld, hier kan je lagen toevoegen door te gaan naar het tab layers aan de linkerkant.
- Kies custom layer
- Upload een file (ik gebruikte altijd een geojson, vanuit qgis kan je lagen hiernaar exporteren)
- Pas de kleurtjes aan indien nodig
- Herhaal de vorige stappen indien nodig
- Klik op publish in de rechterbovenhoek, en publish je kaart. Iedere verdere update aan de kaart moet je ook publishen.
- Voor het instellen van de config heb je nood aan een style link en een access token, ga naar share (knop naast publish).
- Scroll naar beneden tot aan developer resources, daar krijg je je style link en je access token, vul die aan in de config in javascript.

Hopelijk helpt deze beschrijving, laat gerust weten waar het duidelijker kan (via issues en pull requests)

## CSV
Je heb ook een CSV file nodig, ik ben vrij zeker dat dit ook kan door in geoJSON de juist properties mee te geven, maar heb geen tijd gehad mij hiermee bezig te houden (dus voel je vrij om dat zeker wel te doen, je mag mij gerust sturen voor hulp). Je CSV file moet minstens volgende twee kolommen bevatten:  
- Longitude
- Latitude

Deze geven de positie op de kaart van de bolletjes  
Merk op: MapboxGL JS werkt met een decimale '.', geen ',', Engelse notatie is dus noodzakelijk, een aanrader om uw volledige excel of google spreadsheets in engelse getalnotatie te zetten.  
Merk op: als de positie invalid is, dan komt de locatie niet in de lijst, en niet op de kaart

Ook is een aanrader van zeker volgende kolommen mee te geven:
- Titel
- Beschrijving
- Link

Meer kolommen dan deze 5 kunnen worden gebruikt voor in de sidebar mee te geven, of in filters. Zonder de sidebar is het wat verloren moeite.

## Github Pages
Een uitgebreide tutorials voor github pages kan je terugvinden in Benjamin zijn tutorial. Hieronder een kort stappenplan.

- Upload al je files in de hoofdmap van je github repository.
- Ga naar instellingen 'settings'.
- In de linkerkolom, onder 'Code en automation' vind je helemaal vanonder 'Pages'.
- Onder het subtiteltje 'Build and deployement', onder 'Branch' selecteer je de 'main' brach (dit kan soms ook de 'master' branch zijn).
- Duw daarna op save.
- Na enkele minuten zou je site moeten beschikbaar zijn, als dit zo is, komt dit bovenaan de pagine te verschijnen.

## Paddle CMS
De website draait op PaddleCMS (toen ik werkte bij de Vlaamse overheid). Om de kaart toe te voegen op de website zijn twee mogelijkheden. 
De eerste methode is a piece of cake, met een enkel lijntje code staat de site die je op github hebt gemaakt, nu in de webpagine op de site van omgevingvlaanderen.  
De tweede methode vergt wat meer programmeerwerk, het voordeel is dat alle code daarmee op de site van de overheid staat, en dat je niet afhankelijk bent van github om de kaart te zien.

### Via Github
Er bestaat een mogelijkheid om simpelweg hetgeen hier op github getoont wordt op de website te zetten. Hiervoor voeg je een blok toe op Paddle (ga naar de webpagina die je wilt bewerken, en duw op layout, dan kan je blokken en secties toevoegen). En dan krijg je helemaal bovenaan "aangepast blok aanmaken", duw daarop. Kies noor voor "embed widget". 

Voeg volgende code toe in het HTML blokje, waarbij je de url vervangt door de github url van jouw kaart. Je kan de hoogte hierbij aanpassen. Laat de javascript en css blokjes maar met gerust, en duw op "toevoegen".
```html
<iframe style="width:100%;height:700px" src="https://wannes-vlaanderen.github.io/poort-genk"></iframe>
```
Je bent klaar, in de nieuwste layout zou de pagina nu moeten verschijnen.

### Alles op Paddle CMS
Idialiter staat alles op de website van de overheid zelf, je weet nooit dat github iets uitsteekt, en het laatste wat je wilt is al je code kwijt zijn (Github is wel zeer handig voor het debuggen van de kaartjes).

Hiervoor moet je alle bestanden eigenlijk uploaden naar Paddle CMS, hieronder vind je een niet geteste handleiding (dit zou echter moeten werken).  
Voer eerst dezelfde stappen als hierboven uit, nu zullen we en het HTML, en het Javascript en het CSS blok vullen. 
#### HTML
Voeg in het html blok de onderstaande html code toe:
```html
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<link href='https://api.mapbox.com/mapbox-assembly/v0.24.0/assembly.min.css' rel='stylesheet'>
<script src='https://api.mapbox.com/mapbox-assembly/v0.24.0/assembly.js'></script>
<script src='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.css' rel='stylesheet' />
<script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.min.js'></script>
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.2.0/mapbox-gl-geocoder.css' type='text/css'/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/geojson/0.5.0/geojson.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script>
<script src='https://npmcdn.com/csv2geojson@latest/csv2geojson.js'></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<link rel='stylesheet' href="style.css" />

<div style="width:100%;height=700px">
    <div id="map"></div>
</div>
```

#### JavaScript
Javascript is waarschijnlijk het moeilijkste. Hierbij moet je alle javascript files (.js) samenvoegen, maar de volgorde maakt uit (joepie). Alles wordt samengevoegd in main.js, waarbij je achter de config variabele, en vlak voor `const bounds = []` alle code van de andere files moet worden ingevoegd, gewoon een copy paste is voldoende.  
Hierna kan je alles wat in main.js staat (met dus alle extra code) in het javascript blok zetten.

#### CSS
Er is 1 CSS file, kopieer de inhoud van "style.css" naar het CSS veld.

#### Slot
Als alles is ingevuld, en je duwt op bewerken, zou de kaart moeten worden getoond.












