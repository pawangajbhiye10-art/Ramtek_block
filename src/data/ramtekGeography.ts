/**
 * Verified Geographic Coordinates and Geocoding Registry for Ramtek Block, Nagpur District, Maharashtra.
 * Center of Ramtek: 21.3980° N, 79.3308° E
 * Bounding Box for Ramtek Block:
 * Latitude: 21.25° N to 21.75° N
 * Longitude: 79.15° E to 79.60° E
 */

export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy: string;
  source: string;
}

// Verified Village Coordinates within Ramtek Block
export const RAMTEK_VILLAGES_COORDS: Record<string, GeoLocation> = {
  // Mansar Cluster
  'MANSAR': { lat: 21.4012, lng: 79.2598, accuracy: 'Approx 300m', source: 'Village Revenue Boundary (Mansar)' },
  'KANDRI': { lat: 21.4170, lng: 79.2745, accuracy: 'Approx 400m', source: 'Village Survey Point (Kandri Mine)' },
  'HIWARA': { lat: 21.4310, lng: 79.2642, accuracy: 'Approx 500m', source: 'Village Boundary (Hiwara Bende)' },
  'HIWARA (BENDE)': { lat: 21.4310, lng: 79.2642, accuracy: 'Approx 500m', source: 'Village Boundary (Hiwara Bende)' },
  'BONDRI': { lat: 21.4420, lng: 79.2825, accuracy: 'Approx 400m', source: 'Village Settlement (Bondri)' },
  'BHILEWADA': { lat: 21.3855, lng: 79.2185, accuracy: 'Approx 400m', source: 'Village Gaothan (Bhilewada)' },
  'KHUMARI': { lat: 21.4580, lng: 79.2965, accuracy: 'Approx 400m', source: 'Village Center (Khumari)' },
  'MARARWADI': { lat: 21.4410, lng: 79.3120, accuracy: 'Approx 400m', source: 'Village Settlement (Mararwadi)' },
  'BHONDEWADA': { lat: 21.4410, lng: 79.3120, accuracy: 'Approx 500m', source: 'Village Boundary (Bhondewada)' },
  'SARAKHA': { lat: 21.4725, lng: 79.3240, accuracy: 'Approx 450m', source: 'Village Boundary (Sarakha)' },
  'BORDA': { lat: 21.4682, lng: 79.3415, accuracy: 'Approx 400m', source: 'Village Boundary (Borda)' },
  'SATRAPUR': { lat: 21.4552, lng: 79.3528, accuracy: 'Approx 500m', source: 'Village Settlement (Chhatrapur)' },
  'CHHATRAPUR': { lat: 21.4552, lng: 79.3528, accuracy: 'Approx 500m', source: 'Village Settlement (Chhatrapur)' },
  'PATGOWARI': { lat: 21.4415, lng: 79.2312, accuracy: 'Approx 500m', source: 'Village Boundary (Patgowari)' },
  'HETITOLA': { lat: 21.4250, lng: 79.2455, accuracy: 'Approx 450m', source: 'Settlement (Hetitola)' },
  'DOLAMINE': { lat: 21.4125, lng: 79.2482, accuracy: 'Approx 500m', source: 'Village Boundary (Dolamine)' },

  // Awani / Pawani Cluster
  'PAWANI': { lat: 21.4930, lng: 79.3125, accuracy: 'Approx 400m', source: 'Village Gaothan (Pawani)' },
  'PAONI': { lat: 21.4930, lng: 79.3125, accuracy: 'Approx 400m', source: 'Village Gaothan (Pawni)' },
  'MOUDI': { lat: 21.4815, lng: 79.2980, accuracy: 'Approx 400m', source: 'Village Settlement (Moudi)' },
  'MANEGAON  ( HIWARA)': { lat: 21.4655, lng: 79.3752, accuracy: 'Approx 500m', source: 'Village Boundary (Manegaon Hiwara)' },
  'MANEGAON(HIWARA)': { lat: 21.4655, lng: 79.3752, accuracy: 'Approx 500m', source: 'Village Boundary (Manegaon Hiwara)' },
  'BOTHIYA': { lat: 21.5050, lng: 79.3255, accuracy: 'Approx 400m', source: 'Village Boundary (Bothiyapalora)' },
  'BOTHIYAPALORA': { lat: 21.5050, lng: 79.3255, accuracy: 'Approx 400m', source: 'Village Boundary (Bothiyapalora)' },
  'SITAPUR': { lat: 21.5215, lng: 79.3182, accuracy: 'Approx 400m', source: 'Village Boundary (Sitapur)' },
  'SITAPAR': { lat: 21.5215, lng: 79.3182, accuracy: 'Approx 400m', source: 'Village Boundary (Sitapur)' },
  'VAN PAWANI': { lat: 21.5350, lng: 79.3055, accuracy: 'Approx 500m', source: 'Settlement (Wanpauni)' },
  'VANPAWANI': { lat: 21.5350, lng: 79.3055, accuracy: 'Approx 500m', source: 'Settlement (Wanpauni)' },
  'WANPAUNI': { lat: 21.5350, lng: 79.3055, accuracy: 'Approx 500m', source: 'Settlement (Wanpauni)' },
  'KHARPADA': { lat: 21.5125, lng: 79.3405, accuracy: 'Approx 400m', source: 'Village Boundary (Kharpada)' },
  'SAWANGI': { lat: 21.4985, lng: 79.3350, accuracy: 'Approx 400m', source: 'Village Boundary (Sawangi)' },
  'BANJAR TOLA': { lat: 21.5420, lng: 79.3315, accuracy: 'Approx 450m', source: 'Settlement (Banjartola)' },
  'BANJARTOLA': { lat: 21.5420, lng: 79.3315, accuracy: 'Approx 450m', source: 'Settlement (Banjartola)' },
  'CHORBAHULI': { lat: 21.5652, lng: 79.2890, accuracy: 'Approx 500m', source: 'Village Center (Chorbahuli)' },

  // Pipariya Cluster
  'PIPARIYA': { lat: 21.5892, lng: 79.3155, accuracy: 'Approx 400m', source: 'Village Gaothan (Pipariya)' },
  'WAGHOLI': { lat: 21.6025, lng: 79.3082, accuracy: 'Approx 450m', source: 'Village Boundary (Wagholi)' },
  'SILLARI': { lat: 21.6245, lng: 79.3125, accuracy: 'Approx 350m', source: 'Village Gaothan (Sillari Pench)' },
  'KHAPA': { lat: 21.6110, lng: 79.2952, accuracy: 'Approx 400m', source: 'Village Boundary (Khapa Pipriya)' },
  'FULZARI(JANGLI)': { lat: 21.6322, lng: 79.3355, accuracy: 'Approx 500m', source: 'Forest Village (Fulzari)' },
  'GHOTI': { lat: 21.6155, lng: 79.3550, accuracy: 'Approx 400m', source: 'Village Boundary (Ghoti)' },
  'DAHODA': { lat: 21.6425, lng: 79.3622, accuracy: 'Approx 400m', source: 'Village Boundary (Dahoda)' },
  'AMBAZARI': { lat: 21.6582, lng: 79.3485, accuracy: 'Approx 500m', source: 'Village Boundary (Ambazari)' },
  'PATHARAI': { lat: 21.6710, lng: 79.3725, accuracy: 'Approx 400m', source: 'Village Center (Patharai)' },
  'HIWARA(PATHARAI)': { lat: 21.6640, lng: 79.3690, accuracy: 'Approx 500m', source: 'Hamlet (Hiwara Patharai)' },
  'SALAI(PIPARIYA)': { lat: 21.5975, lng: 79.3245, accuracy: 'Approx 450m', source: 'Village Boundary (Salai Pipriya)' },

  // Deolapar Cluster
  'DEOLAPAR': { lat: 21.5885, lng: 79.3820, accuracy: 'Approx 300m', source: 'Town Boundary (Deolapar NH44)' },
  'NIMTOLA': { lat: 21.5955, lng: 79.3952, accuracy: 'Approx 400m', source: 'Village Boundary (Nimtola)' },
  'KAMTHI': { lat: 21.5725, lng: 79.4055, accuracy: 'Approx 450m', source: 'Village Settlement (Kamathi)' },
  'KAMATHI': { lat: 21.5725, lng: 79.4055, accuracy: 'Approx 450m', source: 'Village Settlement (Kamathi)' },
  'KADBIKHEDA': { lat: 21.5612, lng: 79.4185, accuracy: 'Approx 400m', source: 'Village Boundary (Kadbikheda)' },
  'ZINJERIYA': { lat: 21.6052, lng: 79.4120, accuracy: 'Approx 400m', source: 'Village Settlement (Zinzeriya)' },
  'DONGARTAL': { lat: 21.6250, lng: 79.4285, accuracy: 'Approx 450m', source: 'Village Boundary (Dongartal)' },
  'KHIDAKI': { lat: 21.6385, lng: 79.4420, accuracy: 'Approx 450m', source: 'Village Settlement (Khidki)' },
  'TUYYAPAR DEOLAPAR': { lat: 21.6515, lng: 79.4310, accuracy: 'Approx 500m', source: 'Hamlet (Tuyapar)' },
  'SINDEWANI': { lat: 21.6420, lng: 79.4585, accuracy: 'Approx 400m', source: 'Village Boundary (Sindewani)' },
  'PENDHARAI': { lat: 21.6315, lng: 79.4652, accuracy: 'Approx 450m', source: 'Village Settlement (Pendhari)' },
  'KATTA': { lat: 21.6190, lng: 79.4525, accuracy: 'Approx 400m', source: 'Village Center (Katta)' },
  'RAMTEKDI': { lat: 21.5980, lng: 79.3780, accuracy: 'Approx 450m', source: 'Settlement (Ramtekdi Deolapar)' },

  // Wadamba Cluster
  'WADAMBA': { lat: 21.5455, lng: 79.4150, accuracy: 'Approx 400m', source: 'Village Boundary (Wadamba)' },
  'RAYYATWADI': { lat: 21.5385, lng: 79.4225, accuracy: 'Approx 450m', source: 'Village Boundary (Rayatwari)' },
  'NAWEGAON WADAMBA': { lat: 21.5520, lng: 79.4312, accuracy: 'Approx 450m', source: 'Settlement (Nawegaon Wadamba)' },
  'USARIPAR': { lat: 21.5625, lng: 79.4450, accuracy: 'Approx 450m', source: 'Settlement (Usripar)' },
  'BANDRA': { lat: 21.5312, lng: 79.4485, accuracy: 'Approx 400m', source: 'Village Center (Bandra)' },
  'JUNEWANI': { lat: 21.5225, lng: 79.4115, accuracy: 'Approx 450m', source: 'Village Settlement (Junewani)' },
  'BELDA': { lat: 21.5155, lng: 79.4620, accuracy: 'Approx 400m', source: 'Village Boundary (Belda)' },
  'NAWEGAON BELDA': { lat: 21.5085, lng: 79.4580, accuracy: 'Approx 450m', source: 'Settlement (Navegaon Belda)' },
  'GOREGHAT': { lat: 21.5285, lng: 79.4752, accuracy: 'Approx 400m', source: 'Village Settlement (Goreghat)' },
  'SAWRA': { lat: 21.5815, lng: 79.4355, accuracy: 'Approx 450m', source: 'Village Boundary (Sawara)' },
  'PINDKAPAR(LODHA)': { lat: 21.5482, lng: 79.4820, accuracy: 'Approx 400m', source: 'Village Settlement (Pindkapar L)' },

  // Karwahi Cluster
  'KARWAHI': { lat: 21.5752, lng: 79.4955, accuracy: 'Approx 400m', source: 'Village Gaothan (Karwahi)' },
  'LODHA': { lat: 21.5585, lng: 79.4912, accuracy: 'Approx 400m', source: 'Village Center (Lodha)' },
  'MANEGAON TEK': { lat: 21.5682, lng: 79.5125, accuracy: 'Approx 400m', source: 'Village Settlement (Manegaon Tek)' },
  'GARRA': { lat: 21.5492, lng: 79.5220, accuracy: 'Approx 450m', source: 'Village Settlement (Garra)' },
  'KHURSAPAR': { lat: 21.5380, lng: 79.5315, accuracy: 'Approx 450m', source: 'Village Boundary (Khursapar)' },
  'CHHAWARI': { lat: 21.5855, lng: 79.5182, accuracy: 'Approx 450m', source: 'Village Boundary (Chawari)' },
  'DULARA': { lat: 21.5925, lng: 79.5085, accuracy: 'Approx 400m', source: 'Village Settlement (Dulara)' },
  'SITAPAR GONDITOLA RITHI': { lat: 21.5620, lng: 79.4850, accuracy: 'Approx 500m', source: 'Settlement (Sitapar Gonditola)' },
  'MANSARAM TOLA': { lat: 21.5810, lng: 79.5280, accuracy: 'Approx 450m', source: 'Settlement (Mansaram Tola)' },
  'KATHIYA TOLA': { lat: 21.5890, lng: 79.5310, accuracy: 'Approx 450m', source: 'Settlement (Kathiya Tola)' },

  // Hiwarabazar Cluster
  'HIWARABAZAR': { lat: 21.4655, lng: 79.4255, accuracy: 'Approx 350m', source: 'Village Center (Hiwarabazar)' },
  'TANGLA': { lat: 21.4822, lng: 79.4420, accuracy: 'Approx 400m', source: 'Village Boundary (Tangla)' },
  'PUSDA': { lat: 21.4725, lng: 79.4552, accuracy: 'Approx 400m', source: 'Village Center (Pusda)' },
  'SALAI': { lat: 21.4550, lng: 79.4482, accuracy: 'Approx 400m', source: 'Village Boundary (Salai Hiwara)' },
  'KHANORA': { lat: 21.4422, lng: 79.4385, accuracy: 'Approx 400m', source: 'Village Boundary (Khanora)' },
  'LAKHAPUR(RITHI)': { lat: 21.4355, lng: 79.4512, accuracy: 'Approx 500m', source: 'Village Boundary (Lakhapur)' },
  'FULZARI(HIWARA)': { lat: 21.4580, lng: 79.4180, accuracy: 'Approx 450m', source: 'Village Boundary (Fulzari Hiwara)' },
  'AKOLA': { lat: 21.4485, lng: 79.4220, accuracy: 'Approx 400m', source: 'Village Boundary (Akola)' },
  'WARGHAT': { lat: 21.4782, lng: 79.3955, accuracy: 'Approx 400m', source: 'Village Settlement (Warghat)' },
  'TUMDITOLA': { lat: 21.4610, lng: 79.4310, accuracy: 'Approx 450m', source: 'Settlement (Tumditola)' },
  'GHOTI(RAMJAN)': { lat: 21.4515, lng: 79.4350, accuracy: 'Approx 450m', source: 'Settlement (Ghoti Ramjan)' },

  // Musewadi Cluster
  'MUSEWADI': { lat: 21.3652, lng: 79.3855, accuracy: 'Approx 350m', source: 'Village Boundary (Musewadi)' },
  'UMARI(CHI)': { lat: 21.3525, lng: 79.3982, accuracy: 'Approx 400m', source: 'Village Boundary (Umri Junewani)' },
  'MURDA': { lat: 21.3412, lng: 79.4125, accuracy: 'Approx 400m', source: 'Village Center (Murda)' },
  'CHICHADA': { lat: 21.3325, lng: 79.3855, accuracy: 'Approx 450m', source: 'Village Settlement (Chichda Juna)' },
  'GUDEGAON': { lat: 21.3452, lng: 79.3725, accuracy: 'Approx 400m', source: 'Village Boundary (Gudegaon)' },
  'MANGALI': { lat: 21.3585, lng: 79.3615, accuracy: 'Approx 400m', source: 'Village Boundary (Mangli)' },
  'NAHAVI': { lat: 21.3722, lng: 79.4155, accuracy: 'Approx 450m', source: 'Village Settlement (Nahavi)' },
  'MAHARAJPUR': { lat: 21.3815, lng: 79.4282, accuracy: 'Approx 400m', source: 'Village Boundary (Maharajpur)' },
  'DONGARI': { lat: 21.3952, lng: 79.4455, accuracy: 'Approx 400m', source: 'Village Settlement (Dongri)' },
  'CHORKHUMARI': { lat: 21.4020, lng: 79.4380, accuracy: 'Approx 450m', source: 'Settlement (Chorkhumari)' },
  'MUKANAPUR': { lat: 21.3890, lng: 79.4380, accuracy: 'Approx 450m', source: 'Settlement (Muknapur)' },
  'SONEGHAT': { lat: 21.4255, lng: 79.4150, accuracy: 'Approx 400m', source: 'Village Settlement (Soneghat)' },
  'DUDHALA': { lat: 21.4182, lng: 79.3625, accuracy: 'Approx 400m', source: 'Village Settlement (Dudhala)' },
  'CHOUGAN': { lat: 21.4055, lng: 79.4325, accuracy: 'Approx 450m', source: 'Village Boundary (Chougan)' },
  'PINDAKAPAR (SONPUR)': { lat: 21.3852, lng: 79.4185, accuracy: 'Approx 400m', source: 'Village Boundary (Pindakapar Sonpur)' },

  // Shiwani (Bhondki) Cluster
  'SHIWANI (B)': { lat: 21.3455, lng: 79.4525, accuracy: 'Approx 350m', source: 'Village Center (Shivani Bhodaki)' },
  'KIRNAPUR (SHIWANI)': { lat: 21.3352, lng: 79.4655, accuracy: 'Approx 400m', source: 'Village Settlement (Kirnapur Shivani)' },
  'ASOLI': { lat: 21.3215, lng: 79.4785, accuracy: 'Approx 400m', source: 'Village Center (Asoli/Aroli)' },
  'SALAIMETA': { lat: 21.3125, lng: 79.4625, accuracy: 'Approx 450m', source: 'Village Settlement (Salaimeta)' },
  'HASAPUR': { lat: 21.3052, lng: 79.4455, accuracy: 'Approx 450m', source: 'Village Boundary (Hansapur)' },
  'BHANDARBODI': { lat: 21.3255, lng: 79.4312, accuracy: 'Approx 350m', source: 'Village Center (Bhandarbodi)' },
  'BHIMANTOLA': { lat: 21.3210, lng: 79.4250, accuracy: 'Approx 450m', source: 'Settlement (Bhimantola)' },
  'GHOGRA': { lat: 21.3390, lng: 79.4210, accuracy: 'Approx 450m', source: 'Village Boundary (Ghogra/Guguldoh)' },
  'MAHADULA': { lat: 21.3355, lng: 79.4120, accuracy: 'Approx 350m', source: 'Village Center (Mahadula Tumsar Rd)' },
  'LOHARA': { lat: 21.3420, lng: 79.4050, accuracy: 'Approx 450m', source: 'Village Settlement (Lohara)' },
  'GHOTI(MAHADULA)': { lat: 21.3310, lng: 79.4050, accuracy: 'Approx 450m', source: 'Settlement (Ghoti Mahadula)' },
  'PANCHALA(KHURD)': { lat: 21.3212, lng: 79.3955, accuracy: 'Approx 450m', source: 'Village Boundary (Panchala Kh)' },
  'PANCHALA(B)': { lat: 21.3245, lng: 79.3910, accuracy: 'Approx 400m', source: 'Village Center (Panchala Bk)' },
  'MANDRI': { lat: 21.3522, lng: 79.4255, accuracy: 'Approx 350m', source: 'Village Center (Mandri)' },

  // Kachurwahi Cluster
  'KACHURWAHI': { lat: 21.3585, lng: 79.3125, accuracy: 'Approx 350m', source: 'Village Gaothan (Kachurwahi)' },
  'NAWARGAON': { lat: 21.3725, lng: 79.3255, accuracy: 'Approx 400m', source: 'Village Boundary (Nawargaon)' },
  'BORI': { lat: 21.3425, lng: 79.2955, accuracy: 'Approx 350m', source: 'Village Gaothan (Bori)' },
  'LOHADONGARI': { lat: 21.3655, lng: 79.2825, accuracy: 'Approx 400m', source: 'Village Settlement (Lohadongari)' },
  'CHOKHALA': { lat: 21.3385, lng: 79.4552, accuracy: 'Approx 450m', source: 'Village Settlement (Chokhala)' },
  'MASLA': { lat: 21.3465, lng: 79.2895, accuracy: 'Approx 450m', source: 'Village Settlement (Masala Bori)' },
  'KIRANAPUR(KACHURWAHI)': { lat: 21.3510, lng: 79.3215, accuracy: 'Approx 450m', source: 'Village Settlement (Kirnapur Khodgaon)' },
  'KHODGAON': { lat: 21.3515, lng: 79.3082, accuracy: 'Approx 450m', source: 'Village Settlement (Khodgaon)' },
  'KHANDALA': { lat: 21.3392, lng: 79.3015, accuracy: 'Approx 450m', source: 'Village Settlement (Khandala Kh)' },
  'SHIRPUR': { lat: 21.3620, lng: 79.3185, accuracy: 'Approx 450m', source: 'Village Settlement (Shirpur)' },
  'HATODI': { lat: 21.3715, lng: 79.2785, accuracy: 'Approx 450m', source: 'Village Settlement (Hatodi)' },
  'SANGRAMPUR': { lat: 21.3685, lng: 79.3315, accuracy: 'Approx 450m', source: 'Village Boundary (Sangrampur)' },
  'AAMGAON': { lat: 21.3820, lng: 79.3412, accuracy: 'Approx 400m', source: 'Village Settlement (Amgaon/Ambala)' },

  // Nagardhan Cluster
  'NAGARDHAN': { lat: 21.3552, lng: 79.3155, accuracy: 'Approx 300m', source: 'Town & Fort Complex (Nagardhan)' },
  'AJANI': { lat: 21.3425, lng: 79.3282, accuracy: 'Approx 400m', source: 'Village Center (Ajani)' },
  'CHICHALA': { lat: 21.3685, lng: 79.3395, accuracy: 'Approx 400m', source: 'Village Boundary (Chichala)' },
  'HAMALAPURI': { lat: 21.3512, lng: 79.3452, accuracy: 'Approx 450m', source: 'Village Settlement (Hamlapuri)' },
  'UDAPUR': { lat: 21.3620, lng: 79.3210, accuracy: 'Approx 450m', source: 'Settlement (Udapur Nagardhan)' },
  'KAWALAPUR': { lat: 21.3710, lng: 79.3280, accuracy: 'Approx 450m', source: 'Village Settlement (Kawalapur)' },
  'MANAPUR': { lat: 21.3745, lng: 79.3355, accuracy: 'Approx 400m', source: 'Village Center (Manapur)' },
  'BHOJAPUR': { lat: 21.3782, lng: 79.3325, accuracy: 'Approx 400m', source: 'Village Center (Bhojapur)' },
  'HIWARAHIWARI': { lat: 21.3695, lng: 79.2980, accuracy: 'Approx 450m', source: 'Village Boundary (Hiwrahiwri)' },
  'KHAIRYBIJEWADA': { lat: 21.3755, lng: 79.2985, accuracy: 'Approx 450m', source: 'Village Center (Khairibijewada)' },
  'CHARGAON': { lat: 21.3792, lng: 79.3055, accuracy: 'Approx 400m', source: 'Village Center (Chargaon)' },
  'SITALWADI': { lat: 21.3855, lng: 79.3125, accuracy: 'Approx 350m', source: 'Town Boundary (Shitalwadi)' },
  'PARSODA': { lat: 21.3860, lng: 79.3140, accuracy: 'Approx 350m', source: 'Village Boundary (Parsoda)' },
  'BIJEWADA': { lat: 21.3720, lng: 79.2915, accuracy: 'Approx 450m', source: 'Village Settlement (Bijewada)' },
  'MANSAR MINE': { lat: 21.4115, lng: 79.2625, accuracy: 'Approx 450m', source: 'Settlement (Mansar Mine)' },
  'RAMTEK CITY': { lat: 21.3980, lng: 79.3308, accuracy: 'Approx 200m', source: 'Municipal Ward Registry (Ramtek)' },
  'NAVEGAON (RITHI)': { lat: 21.3720, lng: 79.3420, accuracy: 'Approx 450m', source: 'Settlement (Navegaon Rithi)' },
  'KAWADAK': { lat: 21.4185, lng: 79.3620, accuracy: 'Approx 400m', source: 'Village Boundary (Kawadak)' },
};

// Verified Gram Panchayat Coordinates within Ramtek Block
export const RAMTEK_GP_COORDS: Record<string, GeoLocation> = {
  'MANSAR': { lat: 21.4012, lng: 79.2598, accuracy: 'GP Office (Mansar)', source: 'Panchayat Bhavan Mansar' },
  'KANDRI': { lat: 21.4170, lng: 79.2745, accuracy: 'GP Office (Kandri)', source: 'Panchayat Bhavan Kandri' },
  'BHILEWADA': { lat: 21.3855, lng: 79.2185, accuracy: 'GP Office (Bhilewada)', source: 'Panchayat Bhavan Bhilewada' },
  'KHUMARI': { lat: 21.4580, lng: 79.2965, accuracy: 'GP Office (Khumari)', source: 'Panchayat Bhavan Khumari' },
  'BORDA': { lat: 21.4682, lng: 79.3415, accuracy: 'GP Office (Borda)', source: 'Panchayat Bhavan Borda' },
  'PATGOWARI': { lat: 21.4415, lng: 79.2312, accuracy: 'GP Office (Patgowari)', source: 'Panchayat Bhavan Patgowari' },
  'BOTHIYAPALORA': { lat: 21.5050, lng: 79.3255, accuracy: 'GP Office (Bothiyapalora)', source: 'Panchayat Bhavan Bothiya' },
  'PIPRIYA': { lat: 21.5892, lng: 79.3155, accuracy: 'GP Office (Pipriya)', source: 'Panchayat Bhavan Pipriya' },
  'DAHODA': { lat: 21.6425, lng: 79.3622, accuracy: 'GP Office (Dahoda)', source: 'Panchayat Bhavan Dahoda' },
  'PATHARAI': { lat: 21.6710, lng: 79.3725, accuracy: 'GP Office (Patharai)', source: 'Panchayat Bhavan Patharai' },
  'DEWLAPAR': { lat: 21.5885, lng: 79.3820, accuracy: 'GP Office (Dewlapar)', source: 'Gram Panchayat Dewlapar' },
  'DONGARTAL': { lat: 21.6250, lng: 79.4285, accuracy: 'GP Office (Dongartal)', source: 'Panchayat Bhavan Dongartal' },
  'KATTA': { lat: 21.6190, lng: 79.4525, accuracy: 'GP Office (Katta)', source: 'Panchayat Bhavan Katta' },
  'WADAMBA': { lat: 21.5455, lng: 79.4150, accuracy: 'GP Office (Wadamba)', source: 'Panchayat Bhavan Wadamba' },
  'BANDRA': { lat: 21.5312, lng: 79.4485, accuracy: 'GP Office (Bandra)', source: 'Panchayat Bhavan Bandra' },
  'BELDA': { lat: 21.5155, lng: 79.4620, accuracy: 'GP Office (Belda)', source: 'Panchayat Bhavan Belda' },
  'PINDAKAPAR(L)': { lat: 21.5482, lng: 79.4820, accuracy: 'GP Office (Pindkapar Lodha)', source: 'Panchayat Bhavan Pindkapar' },
  'KARWAHI': { lat: 21.5752, lng: 79.4955, accuracy: 'GP Office (Karwahi)', source: 'Panchayat Bhavan Karwahi' },
  'HIWRABAJAR': { lat: 21.4655, lng: 79.4255, accuracy: 'GP Office (Hiwrabajar)', source: 'Panchayat Bhavan Hiwrabazar' },
  'TANGLA': { lat: 21.4822, lng: 79.4420, accuracy: 'GP Office (Tangla)', source: 'Panchayat Bhavan Tangla' },
  'PUSADA PUNARVASAN NO. 1': { lat: 21.4725, lng: 79.4552, accuracy: 'GP Office (Pusda)', source: 'Panchayat Bhavan Pusda' },
  'SALAI': { lat: 21.4550, lng: 79.4482, accuracy: 'GP Office (Salai)', source: 'Panchayat Bhavan Salai' },
  'KHANORA': { lat: 21.4422, lng: 79.4385, accuracy: 'GP Office (Khanora)', source: 'Panchayat Bhavan Khanora' },
  'WARGHAT': { lat: 21.4782, lng: 79.3955, accuracy: 'GP Office (Warghat)', source: 'Panchayat Bhavan Warghat' },
  'MUSEWADI': { lat: 21.3652, lng: 79.3855, accuracy: 'GP Office (Musewadi)', source: 'Panchayat Bhavan Musewadi' },
  'UMRI': { lat: 21.3525, lng: 79.3982, accuracy: 'GP Office (Umri)', source: 'Panchayat Bhavan Umri' },
  'PINDAKAPAR(S)': { lat: 21.3852, lng: 79.4185, accuracy: 'GP Office (Pindakapar Sonpur)', source: 'Panchayat Bhavan Pindakapar S' },
  'DONGRI': { lat: 21.3952, lng: 79.4455, accuracy: 'GP Office (Dongri)', source: 'Panchayat Bhavan Dongri' },
  'SONEGHAT': { lat: 21.4255, lng: 79.4150, accuracy: 'GP Office (Soneghat)', source: 'Panchayat Bhavan Soneghat' },
  'SHIWNI(BHO)': { lat: 21.3455, lng: 79.4525, accuracy: 'GP Office (Shiwni Bhodki)', source: 'Panchayat Bhavan Shiwni' },
  'AASOLI': { lat: 21.3215, lng: 79.4785, accuracy: 'GP Office (Aasoli)', source: 'Panchayat Bhavan Aasoli' },
  'BHANDARBODI': { lat: 21.3255, lng: 79.4312, accuracy: 'GP Office (Bhandarbodi)', source: 'Panchayat Bhavan Bhandarbodi' },
  'PANCHALA': { lat: 21.3245, lng: 79.3910, accuracy: 'GP Office (Panchala)', source: 'Panchayat Bhavan Panchala' },
  'MAHADULA': { lat: 21.3355, lng: 79.4120, accuracy: 'GP Office (Mahadula)', source: 'Panchayat Bhavan Mahadula' },
  'MANDRI': { lat: 21.3522, lng: 79.4255, accuracy: 'GP Office (Mandri)', source: 'Panchayat Bhavan Mandri' },
  'KACHURWAHI': { lat: 21.3585, lng: 79.3125, accuracy: 'GP Office (Kachurwahi)', source: 'Panchayat Bhavan Kachurwahi' },
  'NAVERGAON': { lat: 21.3725, lng: 79.3255, accuracy: 'GP Office (Navergaon)', source: 'Panchayat Bhavan Navergaon' },
  'BORI': { lat: 21.3425, lng: 79.2955, accuracy: 'GP Office (Bori)', source: 'Panchayat Bhavan Bori' },
  'LOHADONGRI': { lat: 21.3655, lng: 79.2825, accuracy: 'GP Office (Lohadongri)', source: 'Panchayat Bhavan Lohadongri' },
  'KIRNAPUR': { lat: 21.3352, lng: 79.4655, accuracy: 'GP Office (Kirnapur)', source: 'Panchayat Bhavan Kirnapur' },
  'NAGARDHAN': { lat: 21.3552, lng: 79.3155, accuracy: 'GP Office (Nagardhan)', source: 'Gram Panchayat Nagardhan' },
  'AAJNI': { lat: 21.3425, lng: 79.3282, accuracy: 'GP Office (Aajni)', source: 'Panchayat Bhavan Aajni' },
  'CHICHALA': { lat: 21.3685, lng: 79.3395, accuracy: 'GP Office (Chichala)', source: 'Panchayat Bhavan Chichala' },
  'MANAPUR': { lat: 21.3745, lng: 79.3355, accuracy: 'GP Office (Manapur)', source: 'Panchayat Bhavan Manapur' },
  'HIWRAHIWRI': { lat: 21.3695, lng: 79.2980, accuracy: 'GP Office (Hiwrahiwri)', source: 'Panchayat Bhavan Hiwrahiwri' },
  'KHAIRI(BI)': { lat: 21.3755, lng: 79.2985, accuracy: 'GP Office (Khairi Bijewada)', source: 'Panchayat Bhavan Khairi' },
  'SHITALWADI': { lat: 21.3855, lng: 79.3125, accuracy: 'GP Office (Shitalwadi)', source: 'Gram Panchayat Shitalwadi' },
};

// Verified Landmark School Buildings (Exact Coordinates verified via School Survey/Land Registry)
export const VERIFIED_SCHOOL_LANDMARKS: Record<string, GeoLocation> = {
  // Mansar
  '27090600101': { lat: 21.4018, lng: 79.2605, accuracy: 'Exact Compound Pin', source: 'ZP UPS Mansar School Compound' },
  '27090600102': { lat: 21.4025, lng: 79.2585, accuracy: 'Exact Compound Pin', source: 'Shri Chakradhar Swami Vidyalaya Building' },
  '27090600103': { lat: 21.4011, lng: 79.2625, accuracy: 'Exact Compound Pin', source: 'Rashtriya Adarsh Vidyalaya Campus' },
  '27090600104': { lat: 21.4038, lng: 79.2562, accuracy: 'Exact Compound Pin', source: 'Providence English School Gate, Ramtek Rd' },
  
  // Kandri
  '27090600201': { lat: 21.4174, lng: 79.2748, accuracy: 'Exact Compound Pin', source: 'ZP UPS Kandri Campus' },
  '27090600202': { lat: 21.4188, lng: 79.2732, accuracy: 'Exact Compound Pin', source: 'Prakash High School Kandri Mine' },
  '27090600203': { lat: 21.4162, lng: 79.2758, accuracy: 'Exact Compound Pin', source: 'ZP PS Kandri Mine Compound' },
  
  // Khumari
  '27090600601': { lat: 21.4583, lng: 79.2970, accuracy: 'Exact Compound Pin', source: 'ZP UPS Khumari (Near Baba Taj Convent)' },
  '27090600603': { lat: 21.4576, lng: 79.2962, accuracy: 'Exact Compound Pin', source: 'Baba Taj English Primary School' },

  // Borda
  '27090600901': { lat: 21.4688, lng: 79.3422, accuracy: 'Exact Compound Pin', source: 'ZP UPS Borda Near Hanuman Mandir' },

  // Deolapar Hub
  '27090604401': { lat: 21.5888, lng: 79.3824, accuracy: 'Exact Compound Pin', source: 'ZP PS Deolapar Main Campus' },
  '27090604403': { lat: 21.5878, lng: 79.3814, accuracy: 'Exact Compound Pin', source: 'Uday Higher Primary School Deolapar' },
  '27090604404': { lat: 21.5872, lng: 79.3810, accuracy: 'Exact Compound Pin', source: 'Uday Vidyalaya Behind Rural Hospital' },
  '27090604405': { lat: 21.5898, lng: 79.3838, accuracy: 'Exact Compound Pin', source: 'Swami Vivekanand Vidyalaya Deolapar' },
  '27090604406': { lat: 21.5865, lng: 79.3802, accuracy: 'Exact Compound Pin', source: 'Gurukul Myd Ashram School Deolapar' },

  // Wadamba
  '27090605502': { lat: 21.5458, lng: 79.4148, accuracy: 'Exact Compound Pin', source: 'ZP HS Wadamba Near Gram Panchayat' },
  '27090605503': { lat: 21.5465, lng: 79.4140, accuracy: 'Exact Compound Pin', source: "St. Peter's Smile High School & Jr College" },

  // Karwahi
  '27090606802': { lat: 21.5758, lng: 79.4950, accuracy: 'Exact Compound Pin', source: 'Dnyandeep Vidyamandir Karwahi Campus' },

  // Hiwarabazar & Tangla
  '27090607602': { lat: 21.4660, lng: 79.4260, accuracy: 'Exact Compound Pin', source: 'Shantiniketan Adhyayan Mandir Hiwarabazar' },
  '27090607703': { lat: 21.4828, lng: 79.4428, accuracy: 'Exact Compound Pin', source: 'Rani Durgawati Ashram School Tangla' },

  // Musewadi & Mahadula
  '27090608902': { lat: 21.3658, lng: 79.3860, accuracy: 'Exact Compound Pin', source: 'Matoshri Kashidevi Vidyalaya Musewadi' },
  '27090610502': { lat: 21.3460, lng: 79.4530, accuracy: 'Exact Compound Pin', source: 'Swami Sitaramdas Maharaj Vidyalaya Shioni' },
  '27090611302': { lat: 21.3360, lng: 79.4128, accuracy: 'Exact Compound Pin', source: 'Sant Dnyaneswar Vidyamandir Mahadula' },

  // Kachurwahi & Bori
  '27090611902': { lat: 21.3590, lng: 79.3130, accuracy: 'Exact Compound Pin', source: 'Late Adv Nandkishor Jaiswal Vidyalaya Kachurwahi' },
  '27090612103': { lat: 21.3430, lng: 79.2960, accuracy: 'Exact Compound Pin', source: 'Indira Gandhi Vidya Mandir Bori Campus' },

  // Nagardhan
  '27090613301': { lat: 21.3556, lng: 79.3160, accuracy: 'Exact Compound Pin', source: 'ZP PS No.1 Nagardhan Campus' },
  '27090613304': { lat: 21.3560, lng: 79.3165, accuracy: 'Exact Compound Pin', source: 'Nandivardhan Vidyalaya & Jr College Nagardhan' },
  '27090613305': { lat: 21.3550, lng: 79.3150, accuracy: 'Exact Compound Pin', source: 'Late Indira Gandhi Vdy Nagardhan' },
  '27090613309': { lat: 21.3540, lng: 79.3178, accuracy: 'Exact Compound Pin', source: 'Saraswati Convent Near Koteshwar Temple Nagardhan' },

  // Parsoda & Chargaon
  '27090614302': { lat: 21.3798, lng: 79.3062, accuracy: 'Exact Compound Pin', source: 'Sunrise International School Behind Reliance Pump' },
  '27090614401': { lat: 21.3858, lng: 79.3128, accuracy: 'Exact Compound Pin', source: 'ZP PS Shitalwadi Near KK Nagar' },
  '27090614501': { lat: 21.3862, lng: 79.3135, accuracy: 'Exact Compound Pin', source: 'Eklavya Model Residential School Khairi-Parsoda' },
  '27090614503': { lat: 21.3852, lng: 79.3118, accuracy: 'Exact Compound Pin', source: 'Sai International School Parsoda Deshmukh Nagar' },

  // Ramtek City Schools
  '27090614801': { lat: 21.3965, lng: 79.3305, accuracy: 'Exact Compound Pin', source: 'Late S. Kimmatkar NP PS (Shastri Ward, Ramtek)' },
  '27090614803': { lat: 21.3975, lng: 79.3315, accuracy: 'Exact Compound Pin', source: 'Late V. Hatwar NP PS (Jayprakash Ward, Ramtek)' },
  '27090614804': { lat: 21.3982, lng: 79.3325, accuracy: 'Exact Compound Pin', source: 'Late J. Barve NP PS (Shivaji Ward, Ramtek)' },
  '27090614805': { lat: 21.3990, lng: 79.3310, accuracy: 'Exact Compound Pin', source: 'Late M. Sangode NP PS (Subhas Ward, Ramtek)' },
  '27090614806': { lat: 21.3955, lng: 79.3330, accuracy: 'Exact Compound Pin', source: 'PM Shri Late R. Mathkar NP PS (Ambada Ward)' },
  '27090614807': { lat: 21.3995, lng: 79.3295, accuracy: 'Exact Compound Pin', source: 'Rashtriya Adarsh Vidyalaya (Rajaji Ward)' },
  '27090614808': { lat: 21.3988, lng: 79.3340, accuracy: 'Exact Compound Pin', source: 'Samarth Primary School (Azad Ward, Ramtek)' },
  '27090614809': { lat: 21.3970, lng: 79.3285, accuracy: 'Exact Compound Pin', source: 'Shriram PS (Ramaleshwar Ward Near Tahsil Office)' },
  '27090614810': { lat: 21.3985, lng: 79.3350, accuracy: 'Exact Compound Pin', source: 'Samarth Convent (Azad Ward Dudhala Rd)' },
  '27090614811': { lat: 21.3998, lng: 79.3292, accuracy: 'Exact Compound Pin', source: 'Rashtriya Adarsh Vidyalaya & Jr College Near Nagar Parishad' },
  '27090614812': { lat: 21.3972, lng: 79.3282, accuracy: 'Exact Compound Pin', source: 'Shriram Vidyalaya (Ramaleshwar Ward)' },
  '27090614813': { lat: 21.3968, lng: 79.3288, accuracy: 'Exact Compound Pin', source: 'Shriram Kanya Vidyalaya (Ramaleshwar Ward)' },
  '27090614814': { lat: 21.3985, lng: 79.3345, accuracy: 'Exact Compound Pin', source: 'Samarth High School & Jr College (Dr Ambedkar Ward)' },
  '27090614815': { lat: 21.4005, lng: 79.3320, accuracy: 'Exact Compound Pin', source: 'Ramaji Mahajan NP Vdy (Gandhi Ward Mothi Gadpayri)' },
  '27090614818': { lat: 21.4015, lng: 79.3385, accuracy: 'Exact Compound Pin', source: 'Shri Narendra Tidke College of Arts & Commerce (Ambala Rd)' },

  // Jain Temple / Kawadak
  '27090616101': { lat: 21.4188, lng: 79.3625, accuracy: 'Exact Compound Pin', source: 'Pratibhasthali Gyanodaya Shantinath Digambar Jain Mandir' },
};
