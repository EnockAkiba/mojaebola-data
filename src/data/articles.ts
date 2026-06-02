export const articles = [
  // ── SYMPTÔMES
  {
    id: '1',
    category: 'Symptômes',
    color: '#D64545',
    icon: 'thermometer',
    titles: {
      Français: "Les symptômes du virus Ebola Bundibugyo",
      Kiswahili: "Dalili za virusi vya Ebola Bundibugyo",
      Lingala: "Bimoko ya virus Ebola Bundibugyo",
    },
    previews: {
      Français: "Fièvre élevée, vomissements, diarrhée, douleurs musculaires et hémorragies. Taux de mortalité : 50%.",
      Kiswahili: "Homa kali, kutapika, kuhara, maumivu ya misuli na kutoka damu. Kiwango cha vifo: 50%.",
      Lingala: "Fiɛvre makasi, kobɛta vomi, kolɛnga, mawa ya misuli mpe makila ebimi. Lifo: 50%.",
    },
    contents: {
      Français: `Les symptômes apparaissent entre 2 et 21 jours après l'exposition au virus.

🔴 Symptômes principaux :
• Fièvre élevée (souvent supérieure à 38,5°C)
• Fatigue intense et faiblesses musculaires
• Maux de tête sévères
• Maux de gorge
• Vomissements et diarrhée
• Éruptions cutanées
• Hémorragies internes et externes (stade avancé)

⚠️ Le virus Bundibugyo en particulier :
La souche Bundibugyo, active en RDC en 2026, provoque des symptômes similaires aux autres souches Ebola mais se propage plus rapidement. Son taux de létalité moyen est de 50%, pouvant atteindre 90% sans prise en charge médicale.

📋 Période d'incubation :
2 à 21 jours. Une personne infectée n'est pas contagieuse avant l'apparition des symptômes.

Sources : Institut Pasteur, OMS, MSF`,
      Kiswahili: `Dalili zinaonekana kati ya siku 2 na 21 baada ya kuambukizwa na virusi.

🔴 Dalili kuu:
• Homa kali (mara nyingi zaidi ya 38.5°C)
• Uchovu mkubwa na udhaifu wa misuli
• Maumivu makali ya kichwa
• Maumivu ya koo
• Kutapika na kuhara
• Upele wa ngozi
• Kutoka damu ndani na nje (hatua ya juu)

⚠️ Virusi vya Bundibugyo hasa:
Aina ya Bundibugyo, inayoenea DRC mwaka 2026, inasababisha dalili zinazofanana na aina nyingine za Ebola lakini inaenea haraka zaidi. Kiwango chake cha vifo ni 50% wastani, inaweza kufikia 90% bila matibabu.

📋 Kipindi cha kuanguliwa:
Siku 2 hadi 21. Mtu aliyeambukizwa si wa kuambukiza kabla ya dalili kuonekana.

Vyanzo: Institut Pasteur, WHO, MSF`,
      Lingala: `Bimoko ebimiaka na mikolo 2 kino 21 sima ya kobɛlama na virus.

🔴 Bimoko ya liboso:
• Fiɛvre makasi (ebungaka koleka 38.5°C)
• Bolɛmbu makasi mpe bopɛtɔlɔ ya misuli
• Mawa makasi ya moto
• Mawa ya nkingo
• Kobɛta vomi mpe kolɛnga
• Bipepe ya nzoto
• Makila ebimi na kati mpe libanda (ntango eleki)

⚠️ Virus Bundibugyo na ye moko:
Souche Bundibugyo, ezali na RDC na 2026, esalaka bimoko ya ndenge moko na souche mosusu ya Ebola kasi epalangani noki koleka. Lifo na ye ezali 50% kati, ekoki kokɔta 90% soki bolambi ezali te.

📋 Ntango ya kobɛlama:
Mikolo 2 kino 21. Moto ya kobɛlama akomi kolela te liboso bimoko ebimi.

Bisoko: Institut Pasteur, OMS, MSF`,
    },
  },
  {
    id: '2',
    category: 'Symptômes',
    color: '#D64545',
    icon: 'alert-circle',
    titles: {
      Français: "Quand consulter en urgence ?",
      Kiswahili: "Lini kuenda hospitalini haraka?",
      Lingala: "Tango nini okei na lopitalo noki?",
    },
    previews: {
      Français: "Si vous avez de la fièvre et avez été en contact avec un malade dans les 21 derniers jours, appelez immédiatement.",
      Kiswahili: "Kama una homa na umegusa mgonjwa katika siku 21 zilizopita, piga simu mara moja.",
      Lingala: "Soki ozali na fiɛvre mpe otangani na moto ya maladi na mikolo 21, benga noki noki.",
    },
    contents: {
      Français: `Appelez le 08214419595 IMMÉDIATEMENT si vous réunissez ces conditions :

🚨 Signes d'alerte absolus :
• Fièvre + contact avec un malade Ebola dans les 21 jours
• Fièvre + contact avec une dépouille dans les 21 jours
• Fièvre + retour d'une zone affectée (Bunia, Goma, Ituri)
• Saignements inexpliqués

❌ Ce qu'il ne faut PAS faire :
• Ne pas se rendre seul à l'hôpital en transport en commun
• Ne pas soigner le malade à domicile sans protection
• Ne pas participer aux rites funéraires si quelqu'un est décédé de l'Ebola
• Ne pas attendre que les symptômes s'aggravent

✅ Ce qu'il faut faire :
• Isolez la personne dans une pièce séparée
• Appelez le numéro vert : 08214419595
• Attendez les équipes médicales
• Lavez-vous les mains au savon immédiatement

Sources : OMS, Ministère de la Santé RDC`,
      Kiswahili: `Piga simu 08214419595 MARA MOJA ukiwa na hali hizi:

🚨 Ishara za tahadhari kabisa:
• Homa + kugusa mgonjwa wa Ebola katika siku 21
• Homa + kugusa maiti katika siku 21
• Homa + kurudi kutoka eneo lililoathiriwa (Bunia, Goma, Ituri)
• Kutoka damu bila sababu

❌ Usifanye:
• Usijisafirisha peke yako hospitali kwa usafiri wa umma
• Usimhudumie mgonjwa nyumbani bila ulinzi
• Usishiriki mazishi kama mtu amekufa kwa Ebola
• Usisubiri dalili kuzidi

✅ Fanya hivi:
• Mtenga mtu katika chumba tofauti
• Piga simu: 08214419595
• Subiri timu za matibabu
• Osha mikono kwa sabuni mara moja

Vyanzo: WHO, Wizara ya Afya DRC`,
      Lingala: `Benga 08214419595 NOKI NOKI soki ozali na makambo oyo:

🚨 Bilembo ya lisakoli makasi:
• Fiɛvre + kotangana na moto ya maladi Ebola na mikolo 21
• Fiɛvre + kobɛta moto ya kokufela na mikolo 21
• Fiɛvre + kozonga na esika ya bokɔngɔ (Bunia, Goma, Ituri)
• Makila ebimi na ntina te

❌ Osala te:
• Okei te kaka na lopitalo na transport ya bato nyonso
• Obolamisi moto ya maladi na ndako te kozanga kobatela yo
• Okei te na libándeli soki moto akufeli na Ebola
• Olɛla te ete bimoko ekola

✅ Sala oyo:
• Kaba moto na chambre mosusu
• Benga: 08214419595
• Lɛla bato ya santé
• Sala mabɔkɔ na savon noki noki

Bisoko: OMS, Ministère ya Santé RDC`,
    },
  },

  // ── PRÉVENTION
  {
    id: '3',
    category: 'Prévention',
    color: '#16A085',
    icon: 'shield-checkmark',
    titles: {
      Français: "Les 5 gestes barrières essentiels",
      Kiswahili: "Hatua 5 muhimu za kujikinga",
      Lingala: "Makambo 5 ya kokeba",
    },
    previews: {
      Français: "Lavage des mains, éviter les contacts, ne pas toucher les dépouilles, éviter la viande de brousse, signaler.",
      Kiswahili: "Osha mikono, epuka mawasiliano, usiguse maiti, epuka nyama ya porini, ripoti.",
      Lingala: "Sala mabɔkɔ, kobɛta bato te, kobɛta moto ya kokufela te, kolya nyama ya zamba te, lokisa.",
    },
    contents: {
      Français: `Ces 5 gestes peuvent vous sauver la vie et celle de votre famille :

✅ Geste 1 — Lavage des mains
Lavez-vous les mains régulièrement avec du savon et de l'eau pendant au moins 20 secondes, ou utilisez un gel hydroalcoolique. C'est le geste le plus efficace.

✅ Geste 2 — Éviter tout contact avec les malades
Ne touchez pas une personne présentant des symptômes d'Ebola, même un membre de votre famille. Portez des gants si vous devez vous en approcher.

✅ Geste 3 — Ne jamais toucher les dépouilles
Le contact avec les corps des personnes décédées d'Ebola est extrêmement dangereux. Les enterrements doivent être gérés par les équipes sanitaires formées.

✅ Geste 4 — Éviter la viande de brousse
Les chauves-souris, primates et autres animaux sauvages peuvent être porteurs du virus. Évitez de les chasser, manipuler ou consommer.

✅ Geste 5 — Signaler immédiatement tout cas suspect
Appelez le 08214419595 dès que vous suspectez un cas. Ne tardez pas : chaque heure compte.

Sources : OMS, UNICEF, MSF`,
      Kiswahili: `Hatua hizi 5 zinaweza kuokoa maisha yako na familia yako:

✅ Hatua 1 — Kuosha mikono
Osha mikono mara kwa mara kwa sabuni na maji kwa sekunde 20 au tumia dawa ya kusafisha mikono. Hii ndiyo hatua yenye ufanisi zaidi.

✅ Hatua 2 — Epuka mawasiliano na wagonjwa
Usiguse mtu mwenye dalili za Ebola, hata mwanafamilia. Vaa glavu ukihitaji kukaribia.

✅ Hatua 3 — Kamwe usiguse maiti
Kugusa miili ya watu waliokufa kwa Ebola ni hatari sana. Mazishi lazima yashughulikiwe na timu za afya zilizofunzwa.

✅ Hatua 4 — Epuka nyama ya porini
Popo, nyani na wanyama wengine wa mwituni wanaweza kubeba virusi. Epuka kuwinda, kushughulikia au kula.

✅ Hatua 5 — Ripoti haraka kesi yoyote inayoshukiwa
Piga simu 08214419595 mara unaposhuku kesi. Usichelewe: kila saa inahesabu.

Vyanzo: WHO, UNICEF, MSF`,
      Lingala: `Makambo 5 oyo ekoki kobikisa yo mpe libota na yo:

✅ Makambo 1 — Sala mabɔkɔ
Sala mabɔkɔ mbala na mbala na savon mpe mayi na sekonde 20 to tumia gel. Oyo nde makambo ya nguya mingi.

✅ Makambo 2 — Kobɛta bato ya maladi te
Kobɛta te moto ya bimoko ya Ebola, ata moto ya libota na yo. Enfila gants soki osengeli kokɔta pene na ye.

✅ Makambo 3 — Kobɛta moto ya kokufela te
Kobɛta nzoto ya bato ya kokufela na Ebola ezali mpasi makasi. Libándeli esengeli kosalema na bato ya santé ya kelasi.

✅ Makambo 4 — Kolya nyama ya zamba te
Bazongizongi, basingi mpe binyama ya zamba ekoki kozala na virus. Kolaka te, kobɛta te to kolya te.

✅ Makambo 5 — Lokisa noki mibéki ya kokeka nyonso
Benga 08214419595 tango otali mibéki. Kolɛla te: ngonga nyonso ezali na ntina.

Bisoko: OMS, UNICEF, MSF`,
    },
  },
  {
    id: '4',
    category: 'Prévention',
    color: '#16A085',
    icon: 'heart',
    titles: {
      Français: "Rites funéraires : comment protéger vos proches",
      Kiswahili: "Mazishi salama: jinsi ya kulinda familia yako",
      Lingala: "Libándeli ya kokufela: ndenge ya kobatela libota na yo",
    },
    previews: {
      Français: "Le contact avec les dépouilles est l'une des principales voies de transmission. Appelez les équipes sanitaires.",
      Kiswahili: "Kugusa maiti ni njia kuu ya kuambukizwa. Wapigie simu timu za afya.",
      Lingala: "Kobɛta moto ya kokufela ezali nzela monene ya kobɛlama. Bebingela bato ya santé.",
    },
    contents: {
      Français: `Le contact avec les dépouilles est responsable d'une part importante de la transmission d'Ebola.

⚠️ Pourquoi c'est dangereux :
Le virus Ebola reste actif dans le corps d'une personne décédée pendant plusieurs jours. Les rituels traditionnels qui impliquent de toucher, laver ou embrasser le corps représentent un risque majeur de contamination.

🙏 Respecter la dignité tout en se protégeant :
Les équipes médicales formées (MSF, Ministère de la Santé) organisent des enterrements dignes et sécurisés qui respectent les traditions locales tout en protégeant la communauté.

📞 Que faire en cas de décès suspect :
1. Ne touchez PAS le corps
2. Éloignez les proches de la pièce
3. Appelez immédiatement le 08214419595
4. Attendez l'arrivée des équipes sanitaires
5. Donnez-leur les coordonnées des personnes en contact avec le défunt

💬 Un message important :
Accepter l'aide des équipes sanitaires n'est pas une trahison de vos traditions. C'est un acte d'amour pour protéger votre famille.

Sources : MSF, OMS, Ministère de la Santé RDC`,
      Kiswahili: `Kugusa maiti kunawajibika kwa sehemu kubwa ya maambukizi ya Ebola.

⚠️ Kwa nini ni hatari:
Virusi vya Ebola hubaki hai mwilini kwa siku kadhaa baada ya kifo. Mila za jadi zinazohusisha kugusa, kuosha au kubusu mwili zinawakilisha hatari kubwa ya kuambukizwa.

🙏 Kuheshimu utu huku ukijilinda:
Timu za matibabu zilizofunzwa (MSF, Wizara ya Afya) zinapanga mazishi ya heshima na salama yanayoheshimu mila za ndani huku yanalinda jamii.

📞 Nini kufanya wakati wa kifo kinachoshukiwa:
1. USIGUSE mwili
2. Weka mbali ndugu kutoka chumbani
3. Piga simu 08214419595 mara moja
4. Subiri timu za afya
5. Wape maelezo ya watu waliogusa marehemu

Vyanzo: MSF, WHO, Wizara ya Afya DRC`,
      Lingala: `Kobɛta nzoto ya bato ya kokufela ezali na ntina monene na kolela Ebola.

⚠️ Mpo na nini ezali mpasi:
Virus Ebola etikalaka na nzoto ya moto ya kokufela na mikolo mwa mwa. Misala ya ndenge ya kala oyo esengelaki kobɛta, kosuka to kopesela likombo nzoto ezali likama monene ya kobɛlama.

🙏 Kobatela lokumu na kobatela yo moko:
Bato ya kelasi ya santé (MSF, Ministère ya Santé) basalaka libándeli ya lokumu mpe ya bopeto oyo elatamaka misala ya mboka mpe ebatelaka community.

📞 Tosala nini tango moto akufeli na bokɔngɔ:
1. Kobɛta nzoto te
2. Kaba bato ya libota na shambre
3. Benga 08214419595 noki noki
4. Lɛla bato ya santé
5. Pesa bango mabɔkɔ ya bato oyo batangani na moto ya kokufela

Bisoko: MSF, OMS, Ministère ya Santé RDC`,
    },
  },
  {
    id: '5',
    category: 'Prévention',
    color: '#16A085',
    icon: 'medical',
    titles: {
      Français: "Bundibugyo : aucun vaccin disponible",
      Kiswahili: "Bundibugyo: hakuna chanjo inayopatikana",
      Lingala: "Bundibugyo: vaccine ezali te",
    },
    previews: {
      Français: "Contrairement aux autres souches, le virus Bundibugyo n'a pas de vaccin approuvé. La prévention est votre seule arme.",
      Kiswahili: "Tofauti na aina nyingine, Bundibugyo haina chanjo. Kujikinga ni silaha yako pekee.",
      Lingala: "Kaka na Bundibugyo, vaccine ezali te. Bokatelemi ezali nzela kaka ya kobatela yo.",
    },
    contents: {
      Français: `⚠️ Information cruciale pour l'épidémie de 2026 :

Le vaccin rVSV-ZEBOV (Ervebo), utilisé lors des épidémies précédentes en RDC (2018-2020), est efficace uniquement contre la souche Zaïre. Il n'est PAS efficace contre le virus Bundibugyo qui circule actuellement.

❌ Il n'existe aujourd'hui :
• Aucun vaccin approuvé contre Bundibugyo
• Aucun traitement antiviral spécifique homologué
• Aucune immunité de groupe disponible

✅ Ce qui fonctionne :
• Les gestes barrières (lavage des mains, éviter les contacts)
• La détection et l'isolement rapides des cas
• Les soins de soutien en CTE (réhydratation, traitement des symptômes)
• Les anticorps monoclonaux mAb114 et REGN-EB3 peuvent aider à réduire la mortalité

🔬 Recherche en cours :
Des équipes scientifiques travaillent en urgence sur un vaccin adapté au Bundibugyo. L'OMS finance des essais cliniques accélérés.

Sources : Institut Pasteur, OMS, Canada Santé Publique`,
      Kiswahili: `⚠️ Taarifa muhimu kwa janga la 2026:

Chanjo rVSV-ZEBOV (Ervebo), iliyotumika wakati wa majanga yaliyopita DRC (2018-2020), inafaa tu dhidi ya aina ya Zaire. HAIFAI dhidi ya virusi vya Bundibugyo vinavyoenea sasa.

❌ Leo hakuna:
• Chanjo iliyoidhinishwa dhidi ya Bundibugyo
• Dawa maalum ya kuzuia virusi iliyoidhinishwa
• Kinga ya kundi inayopatikana

✅ Kinachofanya kazi:
• Hatua za kujikinga (kuosha mikono, epuka mawasiliano)
• Ugunduzi wa haraka na kutengwa kwa kesi
• Huduma za msaada katika CTE
• Kingamwili mAb114 na REGN-EB3 zinaweza kusaidia kupunguza vifo

Vyanzo: Institut Pasteur, WHO, Afya ya Umma Canada`,
      Lingala: `⚠️ Nsango ya ntina makasi ya bokɔngɔ ya 2026:

Vaccine rVSV-ZEBOV (Ervebo), oyo esalemaki na bokɔngɔ ya liboso na RDC (2018-2020), esalaka kaka mpo na souche Zaïre. Esalaka TE mpo na virus Bundibugyo oyo ezali sikoyo.

❌ Lelo ezali te:
• Vaccine ya kotika mpo na Bundibugyo
• Bolambi ya antiviral ya solo oyo etikamaki
• Immunité ya bato nyonso

✅ Oyo esalaka:
• Makambo ya kokeba (sala mabɔkɔ, kobɛta bato te)
• Koluka mpe kobɛnga mibéki noki
• Matabisi ya lisungi na CTE
• Anticorps mAb114 mpe REGN-EB3 ekoki kosalisa

Bisoko: Institut Pasteur, OMS, Santé Publique Canada`,
    },
  },

  // ── TRAITEMENT
  {
    id: '6',
    category: 'Traitement',
    color: '#2980B9',
    icon: 'fitness',
    titles: {
      Français: "Que font les équipes médicales en CTE ?",
      Kiswahili: "Madaktari wanafanya nini katika CTE?",
      Lingala: "Bato ya santé basalaka nini na CTE?",
    },
    previews: {
      Français: "Les centres de traitement dispensent des soins de soutien : réhydratation, glycémie, symptômes. Des anticorps monoclonaux peuvent être utilisés.",
      Kiswahili: "Vituo vya matibabu hutoa huduma: unyevu, sukari, dalili. Kingamwili inaweza kutumika.",
      Lingala: "CTE bopesaka matabisi ya lisungi: mayi, sukali, bimoko. Anticorps ekoki kosalema.",
    },
    contents: {
      Français: `Les Centres de Traitement Ebola (CTE) sont des structures médicales spécialement conçues pour isoler et soigner les patients.

🏥 Soins dispensés :
• Réhydratation intensive (orale ou intraveineuse)
• Contrôle et stabilisation de la glycémie
• Gestion des douleurs et de la fièvre
• Traitement des co-infections
• Prise en charge des défaillances d'organes

💉 Traitements médicamenteux disponibles :
Les anticorps monoclonaux mAb114 et REGN-EB3, approuvés par la FDA, peuvent réduire significativement la mortalité. Leur efficacité contre Bundibugyo est en cours d'évaluation.

👨‍⚕️ Personnel sur place à Bunia et Goma :
MSF, OMS et le Ministère de la Santé RDC ont déployé des équipes médicales spécialisées depuis mai 2026. Plus de 50 tonnes de matériel médical ont été acheminées à Bunia.

❤️ Soutien psychologique :
Les survivants bénéficient d'un accompagnement psychosocial pour faciliter leur réintégration dans la communauté.

Sources : OMS, MSF, Institut Pasteur`,
      Kiswahili: `Vituo vya Matibabu vya Ebola (CTE) ni miundo ya kimatibabu iliyoundwa maalum kutengana na kutibu wagonjwa.

🏥 Huduma zinazotolewa:
• Unyevu mkubwa (mdomo au mishipa)
• Udhibiti na ustabilishaji wa sukari
• Usimamizi wa maumivu na homa
• Matibabu ya maambukizi ya pamoja
• Kushughulikia kushindwa kwa viungo

💉 Dawa zinazopatikana:
Kingamwili mAb114 na REGN-EB3, zilizoidhinishwa na FDA, zinaweza kupunguza vifo. Ufanisi wao dhidi ya Bundibugyo unatathminiwa.

Vyanzo: WHO, MSF, Institut Pasteur`,
      Lingala: `CTE (Centres ya Bolambi Ebola) ezali bisika ya santé oyo esalemi kaka mpo na kobɛnga mpe kobolamisa bato ya maladi.

🏥 Matabisi oyo bopesaka:
• Mayi mingi (na monoko to na mishipa)
• Kontrole mpe stabilisation ya sukali
• Bolambi ya mawa mpe fiɛvre
• Bolambi ya maladi mosusu
• Kolanda biyelo ya nzoto

💉 Bibolamisi oyo ezali:
Anticorps mAb114 mpe REGN-EB3, oyo FDA etikaki, ekoki kokata mingi lifo. Nguya na bango mpo na Bundibugyo ezali na kelasi.

Bisoko: OMS, MSF, Institut Pasteur`,
    },
  },
  {
    id: '7',
    category: 'Traitement',
    color: '#2980B9',
    icon: 'location',
    titles: {
      Français: "Où se faire soigner à Bunia et Goma ?",
      Kiswahili: "Wapi kupata matibabu Bunia na Goma?",
      Lingala: "Wapi kokenda na bolambi na Bunia mpe Goma?",
    },
    previews: {
      Français: "CTE de Bunia et CTE de Goma. L'OMS et MSF ont déployé du personnel depuis le 12 mai. Des dizaines de tonnes de matériel acheminées.",
      Kiswahili: "CTE ya Bunia na CTE ya Goma. WHO na MSF wameweka wafanyakazi tangu Mei 12.",
      Lingala: "CTE ya Bunia mpe CTE ya Goma. OMS mpe MSF batindaki bato banda 12 mai.",
    },
    contents: {
      Français: `📍 Centres de Traitement Ebola actifs :

🏥 CTE de Bunia
Adresse : Avenue Kindu, Bunia (Ituri)
Tél : 08214419595
Statut : Ouvert 24h/24 — Personnel OMS + MSF déployé
Note : Épicentre de l'épidémie. Matériel renforcé depuis mai 2026.

🏥 CTE de Goma
Adresse : Quartier Himbi, Goma (Nord-Kivu)
Tél : 08214419595
Statut : Ouvert — Cas confirmé le 17 mai 2026

🏥 Hôpital Général de Référence de Bunia
Adresse : Avenue de l'Hôpital, Bunia
Tél : 08214419595
Statut : Triage et orientation vers le CTE

⚠️ Important :
N'allez pas directement à l'hôpital si vous suspectez Ebola. Appelez d'abord le 08214419595. Une équipe viendra vous chercher en toute sécurité.

📦 Matériel disponible :
Plus de 50 tonnes de matériel médical ont été acheminées à Bunia par l'OMS et l'UNICEF depuis le début de l'épidémie.

Sources : OMS, MSF, UNICEF`,
      Kiswahili: `📍 Vituo vya Matibabu vya Ebola vilivyo hai:

🏥 CTE ya Bunia
Anwani: Avenue Kindu, Bunia (Ituri)
Simu: 08214419595
Hali: Wazi masaa 24 — Wafanyakazi wa WHO + MSF wamewekwa

🏥 CTE ya Goma
Anwani: Mtaa wa Himbi, Goma (Nord-Kivu)
Simu: 08214419595
Hali: Wazi — Kesi ilithibitishwa tarehe 17 Mei 2026

⚠️ Muhimu:
Usiende hospitali moja kwa moja ukishuku Ebola. Kwanza piga simu 08214419595. Timu itakuja kukuchukua kwa usalama.

Vyanzo: WHO, MSF, UNICEF`,
      Lingala: `📍 CTE ya Bolambi Ebola oyo ezali na mosala:

🏥 CTE ya Bunia
Adrɛsi: Avenue Kindu, Bunia (Ituri)
Tel: 08214419595
Etat: Efungwami ngonga 24 — Bato ya OMS + MSF bazali

🏥 CTE ya Goma
Adrɛsi: Quartier Himbi, Goma (Nord-Kivu)
Tel: 08214419595
Etat: Efungwami — Mibéki ya solo etikamaki 17 mai 2026

⚠️ Ntina:
Okei te noki noki na lopitalo soki otali Ebola. Liboso benga 08214419595. Ekipe ekoya kozwa yo na bopeto.

Bisoko: OMS, MSF, UNICEF`,
    },
  },

  // ── SITUATION
  {
    id: '8',
    category: 'Situation',
    color: '#8E44AD',
    icon: 'globe',
    titles: {
      Français: "17e épidémie d'Ebola en RDC — Bilan au 20 mai 2026",
      Kiswahili: "Janga la 17 la Ebola DRC — Tathmini ya Mei 20, 2026",
      Lingala: "Bokɔngɔ ya 17 ya Ebola na RDC — Bilan ya 20 mai 2026",
    },
    previews: {
      Français: "51 cas confirmés, 500+ suspects, 100+ décès. Provinces touchées : Ituri, Nord-Kivu, Sud-Kivu. Un cas confirmé en Ouganda.",
      Kiswahili: "Kesi 51 zilizothibitishwa, 500+ zinazoshukiwa, 100+ vifo. Ouganda: kesi 1.",
      Lingala: "Mibéki 51 ya solo, 500+ ya kokeka, bato 100+ bakufi. Ouganda: mibéki 1.",
    },
    contents: {
      Français: `📊 Bilan officiel au 20 mai 2026 (Sources : OMS, Africa CDC, Santé Publique Canada) :

🔴 Chiffres clés :
• 51 cas confirmés en laboratoire
• ~600 cas suspects
• 100+ décès (taux de létalité ~50%)
• Provinces touchées : Ituri, Nord-Kivu, Sud-Kivu
• Villes affectées : Bunia, Goma, Butembo, Bukavu
• 1 cas confirmé en Ouganda (décédé le 14 mai)

📍 Épicentre :
L'Ituri est l'épicentre. Bunia, capitale de l'Ituri, est la ville la plus touchée. La propagation vers Goma (Nord-Kivu) a déclenché l'alerte internationale de l'OMS le 17 mai.

🦠 Le virus Bundibugyo :
C'est la 3e épidémie mondiale causée par cette souche spécifique, après l'Ouganda (2007-2008) et la RDC (2012). La souche actuelle est génétiquement distincte des précédentes, suggérant un nouveau passage de l'animal à l'homme.

⚠️ Facteurs aggravants :
• Conflits armés en Ituri (intensifiés fin 2025)
• Déplacement de 100 000+ personnes
• Zone minière avec forte mobilité
• Aucun vaccin disponible contre Bundibugyo
• Transmission documentée au personnel de santé

Sources : OMS, Africa CDC, Santé Publique Canada, MSF, Oxfam`,
      Kiswahili: `📊 Tathmini rasmi ya Mei 20, 2026:

🔴 Takwimu kuu:
• Kesi 51 zilizothibitishwa maabara
• ~600 kesi zinazoshukiwa
• Vifo 100+ (kiwango ~50%)
• Mikoa iliyoathirika: Ituri, Nord-Kivu, Sud-Kivu
• Miji iliyoathirika: Bunia, Goma, Butembo, Bukavu
• Kesi 1 iliyothibitishwa Uganda (alifariki Mei 14)

🦠 Virusi vya Bundibugyo:
Hili ni janga la 3 la kimataifa linalosababishwa na aina hii, baada ya Uganda (2007-2008) na DRC (2012).

Vyanzo: WHO, Africa CDC, Afya ya Umma Canada, MSF`,
      Lingala: `📊 Bilan ya solo ya 20 mai 2026:

🔴 Manumba ya ntina:
• Mibéki 51 oyo laboratoire etikaki
• ~600 mibéki ya kokeka
• Bato 100+ bakufi (~50%)
• Provinces: Ituri, Nord-Kivu, Sud-Kivu
• Villes: Bunia, Goma, Butembo, Bukavu
• Mibéki 1 na Ouganda (akufaki 14 mai)

🦠 Virus Bundibugyo:
Ezali bokɔngɔ ya 3 ya mokili oyo souche oyo esalaka, sima ya Ouganda (2007-2008) mpe RDC (2012).

Bisoko: OMS, Africa CDC, Santé Publique Canada, MSF`,
    },
  },
  {
    id: '9',
    category: 'Situation',
    color: '#8E44AD',
    icon: 'warning',
    titles: {
      Français: "Pourquoi la riposte est complexe à Bunia ?",
      Kiswahili: "Kwa nini majibu ni magumu Bunia?",
      Lingala: "Mpo na nini lisambisi ezali mpasi na Bunia?",
    },
    previews: {
      Français: "Conflits armés, 100 000 déplacés, zones minières difficiles d'accès et résistance communautaire compliquent la riposte.",
      Kiswahili: "Migogoro, watu 100,000 waliohama, maeneo ya migodi na upinzani wa jamii vinazuia majibu.",
      Lingala: "Bitumba, bato 100 000 bakobimaki, bisika ya bilanga mpasi, community epekisi lisambisi.",
    },
    contents: {
      Français: `L'OMS et MSF ont qualifié la situation de "extrêmement préoccupante" en raison de plusieurs facteurs cumulés.

⚔️ Facteur 1 — Conflits armés :
La province de l'Ituri fait face à une intensification des conflits armés depuis fin 2025. Les combats ont entraîné le déplacement de plus de 100 000 personnes, créant des conditions idéales pour la propagation du virus.

⛏️ Facteur 2 — Zone minière :
L'Ituri est une région aurifère caractérisée par d'intenses mouvements de population. Des milliers de mineurs circulent quotidiennement entre les villages et les sites miniers, facilitant la transmission.

🏘️ Facteur 3 — Résistance communautaire :
Certaines communautés refusent les enterrements sécurisés et les mesures de quarantaine, en raison de la méfiance envers les autorités ou des croyances culturelles. L'engagement communautaire est jugé "essentiel" par l'OMS.

📡 Facteur 4 — Accès difficile :
Les zones les plus touchées sont peu accessibles, ce qui limite le transport des échantillons vers les laboratoires et retarde les diagnostics. Peu d'échantillons ont été testés, les bilans reposent sur des cas suspects.

💰 Facteur 5 — Sous-financement :
En 2025, l'aide internationale n'a couvert que 27% des besoins humanitaires en RDC. Les structures sanitaires manquent chroniquement de moyens.

Sources : OMS, MSF, Oxfam, Radio Okapi`,
      Kiswahili: `WHO na MSF wameelezea hali kuwa "ya wasiwasi sana" kutokana na mambo kadhaa yaliyokusanyika.

⚔️ Sababu 1 — Migogoro ya kivita:
Mkoa wa Ituri umekabiliwa na kuongezeka kwa migogoro tangu mwishoni mwa 2025, ukisababisha uhamisho wa zaidi ya watu 100,000.

⛏️ Sababu 2 — Eneo la migodi:
Ituri ni eneo la dhahabu lenye harakati kubwa za watu. Maelfu ya wachimbaji husafiri kila siku kati ya vijiji na tovuti za madini.

🏘️ Sababu 3 — Upinzani wa jamii:
Baadhi ya jamii zinakataa mazishi salama na hatua za karantini, kwa sababu ya kutokuamini mamlaka au imani za kitamaduni.

Vyanzo: WHO, MSF, Oxfam`,
      Lingala: `OMS mpe MSF balobaki situation ezali "mpasi makasi" mpo na makambo mingi oyo ekusanaki.

⚔️ Ntina 1 — Bitumba:
Province ya Ituri ezali na bitumba oyo ekomaki makasi banda suka ya 2025, esilisaki kobimisa bato 100 000+.

⛏️ Ntina 2 — Bisika ya bilanga ya or:
Ituri ezali esika ya or oyo bato bazali kotambolotambola mingi. Bamineurs na nkoto bazali kokende na koya kati ya villes mpe bisika ya bilanga.

🏘️ Ntina 3 — Community epekisi:
Bamoko ya bato bapekisi libándeli ya bopeto mpe quarantaine, mpo na kosilika na bakonzi to na mikano ya culture.

Bisoko: OMS, MSF, Oxfam`,
    },
  },
];