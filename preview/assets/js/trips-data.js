/* Alle voorbeeldreizen op één plek. De reispagina's (cruises, rondreizen, safari,
   strand-stedentrips), de pagina Voorbeeldreizen en de homepage halen ze hieruit.

   Een reis toevoegen of aanpassen: enkel hier.
   - category:    op welke reispagina de reis staat
   - placeholder: true = nog geen echt voorstel; verschijnt enkel op de reispagina
                  (met label), niet op Voorbeeldreizen of de homepage
   - days:        [dag, titel, tekst] per stap van het reisplan
   Geen klantnamen, prijzen, exacte data of hotelnamen. */
window.TRIPS = [
  {
    id: 'douro', category: 'cruises', placeholder: false,
    img: 'assets/img/bestemmingen/douro.jpg', imgAlt: 'Wijnterrassen en een quinta aan de oever van de Douro',
    kicker: 'Riviercruise &amp; strand', title: 'De Douro, met een staart aan zee', desc: '12 dagen, van Porto tot de Atlantische kust',
    from: 'Brussel', to: 'Porto',
    how: 'Rechtstreekse vlucht naar Porto (&plusmn; 2u15). Terug vanuit Lissabon (&plusmn; 2u45). Aan boord van een klein riviercruiseschip van AmaWaterways, met plaats voor een honderdtal gasten.',
    days: [
      ['Dag 1', 'Vlucht naar Porto &amp; inschepen', 'Een transfer van de luchthaven naar de kade, inschepen en een welkomstdiner aan boord. Wie wil, wandelt &rsquo;s avonds nog langs de kleurrijke gevels van de Ribeira.'],
      ['Dag 2', 'R&eacute;gua &amp; Lamego', 'Het schip vaart de vallei in. Een bezoek aan Lamego en de monumentale barokke trap naar het heiligdom, voor wie wil te voet. &rsquo;s Avonds een diner met Portugese specialiteiten op een lokaal wijndomein.'],
      ['Dag 3', 'Castelo Rodrigo', 'Aanmeren bij de Spaanse grens en de klim naar Castelo Rodrigo, een middeleeuws dorp op een heuvel met wijdse uitzichten. Onderweg proef je regionale producten.'],
      ['Dag 4', 'Salamanca', 'Een dagexcursie naar Salamanca: de goudkleurige zandstenen gevels, de Plaza Mayor en een van de oudste universiteiten van Europa.'],
      ['Dag 5', 'Pinh&atilde;o', 'Varen door het hart van de wijnstreek, tussen de terrassen. Een wijnproeverij op een quinta, een bezoek aan een portwijnkelder en een diner op een wijndomein.'],
      ['Dag 6', 'Paleis van Mateus', 'Vanuit R&eacute;gua naar het barokke paleis van Mateus, met zijn sierlijke tuinen en rijk versierde zalen. De namiddag is om te genieten van het uitzicht op het zonnedek.'],
      ['Dag 7', 'Porto', 'Een tocht door de &lsquo;stad van de bruggen&rsquo;, te voet of met de bus, en een proeverij in een van de portwijnkelders van Vila Nova de Gaia. &rsquo;s Avonds een boottocht langs de verlichte kaaien.'],
      ['Dag 8', 'Van de rivier naar de kust', 'Ontschepen na het ontbijt en een priv&eacute;transfer naar Ericeira, een vissersdorp aan de Atlantische Oceaan (&plusmn; 3u). Inchecken in een hotel met zicht op zee.'],
      ['Dag 9&ndash;11', 'Strand &amp; surf in Ericeira', 'Surfles op de golven van Ericeira, voor beginners of gevorderden. Daarnaast tijd voor een strandwandeling langs de kliffen, verse vis in de haven en een uitstap naar het sprookjesachtige Sintra.'],
      ['Dag 12', 'Terugvlucht vanuit Lissabon', 'Een transfer naar de luchthaven van Lissabon (&plusmn; 45 min) en de rechtstreekse vlucht naar Brussel.']
    ],
    note: 'Deze riviercruise van AmaWaterways boekten we al eerder voor onze klanten. Hier vullen we hem aan met de vluchten en vier dagen aan zee. We stemmen elke reis af op jouw wensen.',
    cta: 'Vraag deze reis aan', ctaHref: 'contact.html?interesse=Douro%20riviercruise%20en%20strand'
  },
  {
    id: 'antarctica', category: 'cruises', placeholder: false,
    img: 'assets/img/bestemmingen/zuid-georgie.jpg', imgAlt: 'Koningspingu&iuml;ns voor een besneeuwde berg',
    kicker: 'Expeditiecruise', title: 'De grote zuidelijke lus', desc: '22 dagen, via de Falklands en Zuid-Georgi&euml; naar Antarctica',
    from: 'Brussel', to: 'Buenos Aires',
    how: 'Nachtvlucht met een overstap in Europa (&plusmn; 16u). Terug vanuit Ushuaia via Buenos Aires. Aan boord van Le Bor&eacute;al van PONANT, een elegant expeditieschip voor maximaal 264 gasten.',
    days: [
      ['Dag 1', 'Vlucht naar Buenos Aires', 'Een nachtvlucht vanuit Brussel, met een overstap in een Europese luchthaven.'],
      ['Dag 2', 'Aankomst in Buenos Aires', 'Een transfer naar een hotel in de chique wijk Recoleta. &rsquo;s Avonds een tangoshow met een Argentijnse steak en een glas malbec.'],
      ['Dag 3', 'Buenos Aires &amp; inschepen', 'Een stadsrondrit langs de Plaza de Mayo, de Casa Rosada en de kleurrijke huizen van La Boca, met lunch in een lokaal restaurant. In de namiddag inschepen, en &rsquo;s avonds vaart het schip uit.'],
      ['Dag 4&ndash;8', 'Op zee naar het zuiden', 'Lezingen van de natuurgidsen aan boord over de dieren en de geschiedenis van het zuidpoolgebied, fotoworkshops, de spa en uitkijken naar albatrossen en walvissen vanop het dek.'],
      ['Dag 9', 'Port Stanley, Falklandeilanden', 'Een wandeling langs de kleurrijke huisjes, de kathedraal en de boog van walvisbotten, of een uitstap naar een strand waar pingu&iuml;ns broeden.'],
      ['Dag 10&ndash;11', 'Op zee', 'Voorbereiden op Zuid-Georgi&euml;, met een briefing over de landingen en het grondig reinigen van je kledij en laarzen.'],
      ['Dag 12&ndash;14', 'Zuid-Georgi&euml;', 'Met de zodiac aan land tussen zeeolifanten, pelsrobben en kolonies koningspingu&iuml;ns, op Salisbury Plain met meer dan 300.000 dieren. Ook de gletsjers van Gold Harbour en de vlaktes van Fortuna Bay, in de voetsporen van Shackleton.'],
      ['Dag 15&ndash;16', 'Op zee', 'Tussen de eerste ijsbergen richting het Antarctisch Schiereiland, met lezingen over de grote poolreizigers.'],
      ['Dag 17&ndash;18', 'Antarctisch Schiereiland', 'Elke dag zodiactochten en landingen tussen gletsjers en tafelijsbergen, met ezelspingu&iuml;ns, zeehonden en bultruggen. Wie wil, verkent de baaien met de kajak.'],
      ['Dag 19&ndash;20', 'Drake Passage', 'De overtocht naar Zuid-Amerika, met albatrossen en Kaapse stormvogels die het schip volgen.'],
      ['Dag 21', 'Ushuaia &amp; terugvlucht', 'Vroeg in de ochtend ontschepen in Ushuaia, aan &lsquo;het einde van de wereld&rsquo;. De vlucht naar Buenos Aires (&plusmn; 3u30) is inbegrepen, en daar neem je de nachtvlucht naar Brussel.'],
      ['Dag 22', 'Aankomst in Brussel', 'Thuiskomen met een hoofd vol ijs, stilte en pingu&iuml;ns.']
    ],
    note: 'Deze expeditiecruise van PONANT boekten we al eerder voor onze klanten. Hier vullen we hem aan met de vluchten en twee dagen in Buenos Aires. Landingen en dierenwaarnemingen hangen af van het weer en het ijs. We stemmen elke reis af op jouw wensen.',
    cta: 'Vraag deze reis aan', ctaHref: 'contact.html?interesse=Expeditiecruise%20Antarctica%20met%20PONANT'
  },
  {
    id: 'adriatische-zee', category: 'cruises', placeholder: false,
    img: 'assets/img/bestemmingen/dubrovnik.jpg', imgAlt: 'De stadsmuren van Dubrovnik boven de blauwe Adriatische Zee',
    kicker: 'Luxe oceaancruise', title: 'Van Dubrovnik naar Athene', desc: '9 dagen langs Kroati&euml;, Montenegro, Itali&euml; en Griekenland',
    from: 'Brussel', to: 'Dubrovnik',
    how: 'Vlucht naar Dubrovnik (&plusmn; 2u15). Terug vanuit Athene (&plusmn; 3u15). Aan boord van de Seabourn Ovation, een intiem luxeschip met enkel suites, voor zo&rsquo;n 600 gasten.',
    days: [
      ['Dag 1', 'Vlucht naar Dubrovnik &amp; inschepen', 'Een transfer naar de haven en inschepen in je suite. Het schip vertrekt pas laat op de avond, dus er is tijd voor een wandeling over de Stradun en een glas wijn binnen de oude stadsmuren.'],
      ['Dag 2', 'Kor&#269;ula', 'Slenteren door het ommuurde middeleeuwse stadje, waar Marco Polo geboren zou zijn. Of een proeverij bij een Dalmatisch wijnhuis, kajakken en snorkelen tussen de eilandjes, of met de speedboot naar het nationaal park van Mljet.'],
      ['Dag 3', 'Kotor', '&rsquo;s Ochtends vaart het schip de fjordachtige Baai van Kotor binnen. Beklim de stadsmuren tot aan het fort, of neem een boot naar het eilandkerkje bij Perast.'],
      ['Dag 4', 'Brindisi &amp; Lecce', 'Een uitstap naar Lecce, de barokke parel van Puglia, met zijn Romeins amfitheater en gebeeldhouwde kerkgevels. Proef er een pasticciotto, het typische roomgebakje.'],
      ['Dag 5', 'Korfoe', 'Venetiaanse steegjes in de oude stad, het Achilleion-paleis van keizerin Sissi, of zwemmen in de baaien van Paleokastritsa.'],
      ['Dag 6', 'Itea &amp; Delphi', 'Vanuit Itea door de olijfgaarden naar Delphi, het heiligdom van Apollo hoog op de berghelling. In het museum staat de beroemde bronzen wagenmenner.'],
      ['Dag 7', 'Een dag op zee', 'Tijd voor de spa, het zwembad en een lange lunch aan dek. &rsquo;s Avonds een diner in een van de restaurants aan boord.'],
      ['Dag 8', 'Gythion &amp; Sparta', 'Een bezoek aan de Byzantijnse ru&iuml;nes van Mystras bij Sparta, of een boottocht door de ondergrondse grotten van Diros.'],
      ['Dag 9', 'Athene &amp; terugvlucht', 'Vroeg in de ochtend aanmeren in Piraeus. Met een late vlucht is er nog tijd voor de Akropolis en de Plaka, daarna de transfer naar de luchthaven en de vlucht naar Brussel.']
    ],
    note: 'Deze cruise van Seabourn boekten we al eerder voor onze klanten. Hier vullen we hem aan met de vluchten. We stemmen elke reis af op jouw wensen.',
    cta: 'Vraag deze reis aan', ctaHref: 'contact.html?interesse=Seabourn%20cruise%20Adriatische%20Zee%20en%20Griekenland'
  },
  {
    id: 'sri-lanka', category: 'rondreizen', placeholder: false,
    img: 'assets/img/reizen/sri-lanka.jpg', imgAlt: 'Trein op de Nine Arches Bridge bij Ella, Sri Lanka',
    kicker: 'Rondreis met chauffeur-gids', title: 'Sri Lanka, van theeheuvels tot strand', desc: '16 dagen, van Colombo tot Negombo',
    from: 'Brussel', to: 'Colombo',
    how: 'Vlucht met &eacute;&eacute;n overstap in Doha (&plusmn; 11u vliegen). Ter plaatse een priv&eacute;minibus met airco en een Engelstalige chauffeur-gids.',
    days: [
      ['Dag 1&ndash;2', 'Colombo', 'Aankomst, onthaal en transfer naar een viersterrenhotel aan de oceaan. In de namiddag een stadsrondrit.'],
      ['Dag 3&ndash;4', 'Ella', 'Een zipline van 500 meter over theeplantages en valleien, per tuktuk naar Lipton&rsquo;s Seat, de wandeling naar Little Adam&rsquo;s Peak en de Nine Arches Bridge. Overnachten in een kleinschalig hotel in de heuvels.'],
      ['Dag 5', 'Met de trein naar Nuwara Eliya', 'Een trage treinrit door tunnels en langs theeplukkers, naar het hart van de Ceylon-thee.'],
      ['Dag 6&ndash;7', 'Kandy', 'Een theefabriek met rondleiding, de Ambuluwawa-toren met zicht rondom, de botanische tuinen van Peradeniya en de avondceremonie in de Tempel van de Tand.'],
      ['Dag 8', 'Knuckles-gebergte', 'Trekking met een lokale gids langs dorpen, rijstvelden en watervallen. Overnachten in een eco-lodge tussen de theevelden.'],
      ['Dag 9&ndash;10', 'Dambulla, Sigiriya &amp; Minneriya', 'Een kruidentuin in Matale, de bijna 2.000 jaar oude grottentempel van Dambulla, de Leeuwenrots van Sigiriya en een jeepsafari tussen de olifanten van Minneriya.'],
      ['Dag 11&ndash;13', 'Polonnaruwa &amp; Passikudah', 'Per fiets door de oude koningsstad Polonnaruwa, daarna drie dagen aan de kalme, ondiepe baai van Passikudah in een strandresort.'],
      ['Dag 14&ndash;15', 'Mihintale, Anuradhapura &amp; Negombo', 'De heuvel waar het boeddhisme het eiland bereikte, de heilige Bo-boom in Anuradhapura en een laatste nacht aan zee.'],
      ['Dag 16', 'Terugvlucht', 'Via Doha terug naar Brussel.']
    ],
    note: 'Een reis die we op maat samenstelden voor de zomervakantie. We stemmen elke reis af op jouw wensen.',
    cta: 'Vraag een reis naar Sri Lanka aan', ctaHref: 'contact.html?interesse=Rondreis%20Sri%20Lanka'
  },
  {
    id: 'portugal', category: 'rondreizen', placeholder: false,
    img: 'assets/img/reizen/portugal.jpg', imgAlt: 'Porto bij valavond met een traditionele rabelo-boot op de Douro',
    kicker: 'Fly &amp; drive', title: 'Portugal langs de kust, van Porto naar Cascais', desc: '12 nachten, rond kerst en nieuw',
    from: 'Brussel', to: 'Porto',
    how: 'Rechtstreekse vlucht (&plusmn; 2,5u), terug vanuit Lissabon. Een huurwagen van luchthaven tot luchthaven.',
    days: [
      ['Nacht 1&ndash;3', 'Porto', 'Een boetiekhotel met spa in Foz, waar de Douro de oceaan ontmoet. Aan de overkant van de rivier, in Vila Nova de Gaia, liggen de portwijnkelders.'],
      ['Mogelijk onderweg', 'Wijnstop in de Bairrada', 'De wijnstreek tussen Porto en Coimbra, bekend om haar mousserende wijnen en speenvarken.'],
      ['Nacht 4&ndash;5', 'Coimbra', 'De oude universiteitsstad aan de Mondego. Overnachten op een historisch landgoed met tuinen en spa.'],
      ['Nacht 6&ndash;8', 'Ericeira', 'Een vissersdorp en surfplek aan de Atlantische kust, met verse vis en zeevruchten. Een hotel met zicht op de oceaan.'],
      ['Mogelijk onderweg', 'Sintra', 'De sprookjesachtige paleizen en tuinen van Sintra, werelderfgoed, tussen Ericeira en Cascais.'],
      ['Nacht 9&ndash;12', 'Cascais', 'Een elegante kustplaats vlak bij Lissabon, om het nieuwe jaar aan zee in te zetten. Een artistiek boetiekhotel in het centrum.'],
      ['Terugreis', 'Lissabon', 'De huurwagen inleveren op de luchthaven en terugvliegen naar Brussel.']
    ],
    note: 'Een fly &amp; drive die we op maat samenstelden voor de feestdagen: vier hotels met ontbijt en een huurwagen van Porto tot Lissabon. De stops &lsquo;mogelijk onderweg&rsquo; zijn suggesties; we stemmen elke reis af op jouw wensen.',
    cta: 'Vraag een reis naar Portugal aan', ctaHref: 'contact.html?interesse=Fly%20%26%20drive%20Portugal'
  },
  {
    id: 'oeganda', category: 'safari', placeholder: false,
    img: 'assets/img/regios/rwanda-oeganda.jpg', imgAlt: 'Berggorilla in het regenwoud van Oeganda',
    kicker: 'Priv&eacute;-safari met gids', title: 'Oeganda, van de Nijl tot de berggorilla&rsquo;s', desc: '13 dagen, van Entebbe tot Lake Mburo',
    from: 'Brussel', to: 'Entebbe',
    how: 'Vlucht met een korte tussenstop in Kigali (&plusmn; 10,5u). Ter plaatse een priv&eacute; 4x4 met uitklapdak en een Engelstalige gids.',
    days: [
      ['Dag 1', 'Aankomst Entebbe', 'Ontvangst op de luchthaven en een priv&eacute;transfer naar het hotel.'],
      ['Dag 2&ndash;4', 'Murchison Falls', 'Onderweg de neushoorns van Ziwa. Een ochtendsafari langs de Nijl, een bootsafari tot aan de watervallen en een wandeling naar de top.'],
      ['Dag 4&ndash;6', 'Kibale', 'Langs Lake Albert en de kratermeren van Fort Portal naar het regenwoud. Met een ranger op zoek naar chimpansees, en een wandeling door het Bigodimoeras.'],
      ['Dag 6&ndash;8', 'Queen Elizabeth &amp; Ishasha', 'Een boottocht op het Kazingakanaal tussen de nijlpaarden, en in Ishasha op zoek naar de boomklimmende leeuwen.'],
      ['Dag 8&ndash;10', 'Bwindi', 'Via de groene Kigezi Highlands naar het ondoordringbare woud, voor een trekking naar de berggorilla&rsquo;s.'],
      ['Dag 10&ndash;11', 'Lake Bunyonyi', 'Even tot rust komen aan het meer, na de trekking.'],
      ['Dag 11&ndash;13', 'Lake Mburo &amp; terugreis', 'Zebra&rsquo;s, elandantilopen en een lunch met Oegandese gerechten. Een laatste natuurwandeling, een fotostop op de evenaar en de nachtvlucht naar Brussel.']
    ],
    note: 'Een priv&eacute;-safari die we op maat samenstelden voor de zomervakantie, in sfeervolle lodges met vol pension. De permits voor de gorilla&rsquo;s en chimpansees waren inbegrepen. We stemmen elke reis af op jouw wensen.',
    cta: 'Vraag deze reis aan', ctaHref: 'contact.html?interesse=Safari%20Oeganda'
  },
  {
    id: 'zuid-afrika', category: 'safari', placeholder: false,
    img: 'assets/img/regios/zuid-afrika.jpg', imgAlt: 'Leeuwin met welpen in Zuid-Afrika',
    kicker: 'Fly &amp; drive met safari', title: 'Zuid-Afrika, langs de Tuinroute naar Kaapstad', desc: '14 dagen, met het hele gezin',
    from: 'Brussel', to: 'Port Elizabeth',
    how: 'Vlucht via Dubai en Johannesburg, terug vanuit Kaapstad. Ter plaatse een 4x4 huurwagen met onbeperkte kilometers.',
    days: [
      ['Dag 1&ndash;2', 'Aankomst Port Elizabeth', 'Een eerste nacht in een strandhuis aan de oceaan.'],
      ['Dag 3&ndash;5', 'Addo', 'Glamping in een luxetent met eigen hot tub, dicht bij het olifantenpark. Ontbijtmand en braaipakket om zelf op de barbecue klaar te maken.'],
      ['Dag 5&ndash;6', 'Tsitsikamma', 'Een lodge in het groen, met een unit met eigen plunge pool.'],
      ['Dag 6&ndash;8', 'Knysna', 'Twee dagen op een landgoed met tuinsuites, het hart van de Tuinroute.'],
      ['Dag 8&ndash;10', 'Klein Karoo', 'Een game lodge met halfpension en elke dag een activiteit: een bushsafari of een ontmoeting met olifanten.'],
      ['Dag 10&ndash;11', 'Kaapse wijnlanden', 'Een eigen cottage op een boerderij.'],
      ['Dag 11&ndash;14', 'Kaapstad &amp; terugreis', 'Een panoramisch appartement in Camps Bay, tussen de oceaan en de Tafelberg. Daarna de terugvlucht vanuit Kaapstad.']
    ],
    note: 'Een fly &amp; drive die we op maat samenstelden voor een gezin met kinderen in de paasvakantie: familiekamers, een ruime 4x4 en elke dag een andere omgeving. We stemmen elke reis af op jouw wensen.',
    cta: 'Vraag deze reis aan', ctaHref: 'contact.html?interesse=Safari%20Zuid-Afrika'
  },
  {
    id: 'new-york', category: 'strand-stedentrips', placeholder: false,
    img: 'assets/img/reizen/new-york.jpg', imgAlt: 'Gietijzeren gevels aan Prince Street in SoHo, New York',
    kicker: 'Stedenreis', title: 'New York in drie wijken', desc: '9 nachten, Manhattan en Brooklyn',
    from: 'Brussel', to: 'New York',
    how: 'Rechtstreekse vlucht (&plusmn; 8,5u).',
    days: [
      ['Nacht 1&ndash;5', 'Meatpacking District', 'Een vijfsterrenhotel met dakterras, zwembad en zicht op de skyline, op wandelafstand van de High Line, Chelsea en Greenwich Village.'],
      ['Nacht 6&ndash;7', 'Williamsburg, Brooklyn', 'Een karaktervol hotel in een fabrieksgebouw uit 1901, met een rooftopbar en uitzicht op Manhattan. Restaurants, winkeltjes en de waterkant van Brooklyn liggen om de hoek.'],
      ['Nacht 8&ndash;9', 'SoHo', 'Een vijfsterrenhotel met rooftopzwembad tussen galerie&euml;n en boetieks, vlak bij Tribeca en de Hudson.']
    ],
    note: 'Een stedenreis die we op maat samenstelden voor de lente: drie hotels in drie buurten, zodat je New York telkens vanuit een andere wijk beleeft. Goed om te weten: voor de Verenigde Staten heb je een ESTA nodig, aan te vragen minstens 72 uur voor vertrek.',
    cta: 'Vraag een reis naar New York aan', ctaHref: 'contact.html?interesse=Stedenreis%20New%20York'
  }
];

window.TRIP_CATEGORIES = {
  'cruises': 'Cruises',
  'rondreizen': 'Rondreizen',
  'safari': 'Safari',
  'strand-stedentrips': 'Strand &amp; Stedentrips'
};
