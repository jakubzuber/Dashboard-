const config = require('./dbConfig');
const sql = require('mssql');

// sql dla planera

const getDataDashboard = async() => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        USE Dashboard

        SELECT * FROM LOADING_OFFLOADING_PLANNER WHERE LOADING_DATE LIKE CAST(GETDATE() AS DATE) ORDER BY SORT
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
};

const insertIndexDashboard = async(data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        USE Dashboard

        UPDATE LOADING_OFFLOADING_PLANNER
        SET SORT = ('${data.SORT}') 
        WHERE ID = (${data.ID})
        `)
    }
    catch(error) {
        console.log(error)
    }
};

const insertRampDashboard = async(data) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(`
        USE Dashboard

        UPDATE LOADING_OFFLOADING_PLANNER
        SET RAMP = ('${data.RAMP}') 
        WHERE ID = (${data.ID})
        `)
    }
    catch(error) {
        console.log(error)
    }
};


// zapytania do bazy odnośnie przyjazdów/wyjazdów aut międzynarodowych

const getDataRoutesImports = async() => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        USE INTL_eSpeed

        SELECT
        LL.ID_LISTY_LINIOWE,
        LL.SLOT_5,
        LL.NR_LISTU, 
		CASE WHEN LEN(LL.SAMOCHOD) > 9 THEN '' ELSE LL.SAMOCHOD END SAMOCHOD,
        LL.NACZEPA, 
        LL.PRZEWOZNIK, 
        ISNULL(left(cast(ZW.GODZ as time),5), '') PLAN_GODZ_ROZLAD_OD,
		ISNULL(LEFT(CAST(ZW.GODZ_DO AS time),5), '') PLAN_GODZ_ROZLAD_DO,
        CASE WHEN LL.DZIAL LIKE 'PRL' THEN 'BULL' ELSE LL.DZIAL END DZIAL,
        LL.ILOSC_PRZESYLEK, 
        CASE WHEN LL.STATUS LIKE 'ZP' THEN 'TAK' ELSE 'NIE' END STATUS, 
        CASE WHEN LL.GEN_ZAWY_OK = 1 THEN 'TAK' ELSE 'NIE' END GEN_ZAWY_OK,
		CASE WHEN LL.Magazynier_id = 0 then 0
			 WHEN LL.Magazynier_id is null then 0
			 else 1 end OBSLUGA,
        K.IMIE,
        CASE WHEN CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) THEN 0 ELSE 1 END CZAS,
        CAST(CONCAT(DATEDIFF(s,CAST(LL.Magazynier_DataCzas AS TIME) , CAST(GETDATE() AS TIME)), 0, 0, 0) AS INT) TIME,
		LL.ADR
        FROM LISTY_LINIOWE LL WITH(NOLOCK)
		INNER JOIN LISTY_LINIOWE_ZA_WY ZW WITH(NOLOCK) ON LL.ID_LISTY_LINIOWE = ZW.LISTY_LINIOWE_ID outer apply (
                            select 
                            CASE WHEN K.IMIE LIKE 'AGENCJA' THEN 'Tomasz'
                            ELSE K.IMIE END IMIE
                            from KIEROWCY K WITH(NOLOCK)
                            where K.ID_KIEROWCY = LL.Magazynier_id 
                            ) K
        WHERE LL.STAN LIKE 'O' 
        AND LL.RODZAJ LIKE 'IMPORT'
		AND ZW.TYP LIKE 'WY'
		AND ZW.MIEJSCE_ID = 1
		AND (CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) OR CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() + 1 AS DATE))
        ORDER BY LL.DZIAL 
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
};

const getDataRoutesExports = async() => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        USE INTL_eSpeed

        SELECT
        LL.ID_LISTY_LINIOWE,
        LL.SLOT_5,
        LL.NR_LISTU, 
        LL.SAMOCHOD, 
        LL.NACZEPA, 
        LL.PRZEWOZNIK, 
        ISNULL(left(cast(ZW.GODZ as time),5), '') PLAN_GODZ_ZALAD_OD,
		ISNULL(LEFT(CAST(ZW.GODZ_DO AS time),5), '') PLAN_GODZ_ZALAD_DO, 
        CASE WHEN LL.DZIAL LIKE 'PRL' THEN 'BULL' ELSE LL.DZIAL END DZIAL, 
        LL.ILOSC_PRZESYLEK, 
        CASE WHEN LL.STATUS LIKE 'ZP' THEN 'TAK' ELSE 'NIE' END STATUS, 
        CASE WHEN LL.GEN_ZAWY_OK = 1 THEN 'TAK' ELSE 'NIE' END GEN_ZAWY_OK,
        CASE WHEN LL.Magazynier_id = 0 then 0
			 WHEN LL.Magazynier_id is null then 0
			 else 1 end OBSLUGA,
        K.IMIE,
        CASE WHEN CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) THEN 0 ELSE 1 END CZAS,
        CAST(CONCAT(DATEDIFF(s,CAST(LL.Magazynier_DataCzas AS TIME) , CAST(GETDATE() AS TIME)), 0, 0, 0) AS INT) TIME,
		LL.ADR
        FROM LISTY_LINIOWE LL WITH(NOLOCK)
		INNER JOIN LISTY_LINIOWE_ZA_WY ZW WITH(NOLOCK) ON LL.ID_LISTY_LINIOWE = ZW.LISTY_LINIOWE_ID outer apply (
                            select 
                            CASE WHEN K.IMIE LIKE 'AGENCJA' THEN 'Tomasz'
                            ELSE K.IMIE END IMIE
                            from KIEROWCY K WITH(NOLOCK)
                            where K.ID_KIEROWCY = LL.Magazynier_id 
                            ) K
        WHERE LL.STAN LIKE 'O' 
        AND LL.RODZAJ LIKE 'EXPORT'
		AND ZW.TYP LIKE 'ZA'
		AND ZW.MIEJSCE_ID = 1
		AND (CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) OR CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() + 1 AS DATE))
        ORDER BY LL.DZIAL 
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
};

const getDataOrders = async() => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        USE INTL_eSpeed

        SELECT DISTINCT
		LL.ID_LISTY_LINIOWE,
		CASE WHEN P.SLOT_1 LIKE 'EXCOW' THEN 1
			 WHEN P.SLOT_3 LIKE 'DOW' THEN 1
			 ELSE 0 END CHUJ,
		P.SLOT_1,
		P.SLOT_3,
        P.DZIAL,
		P.NR_PRZESYLKI,
        P.ID_PRZESYLKI,
		CASE WHEN P.CELNA = 1 THEN P.POTW_ODPR ELSE 999 END CELNA,
        P.ILOSC_DEKL,
        ROUND(P.WAGA_DEKL, 2) WAGA,
		P.KLIENT_NAD_SYMBOL,
		P.KLIENT_ODB_SYMBOL,
        CASE WHEN F.FORMA_PLATNOSCI LIKE 'PRZEDPŁATA' THEN (CASE WHEN F.ZAPLACONO = 1 THEN 1 ELSE (CASE WHEN STATUS_NEW LIKE 'WAR' THEN 2 ELSE 0 END) END) ELSE 999 END PLATNOSC
		-- // -1 bez przedpłaty // 0 nie zapłacono // 1 zapłacono // 2 zapłacono warunkowo
        FROM LISTY_LINIOWE AS LL WITH(NOLOCK) INNER JOIN LISTY_LINIOWE_POZ AS LP WITH(NOLOCK) ON LP.LISTY_LINIOWE_ID = LL.ID_LISTY_LINIOWE
								 INNER JOIN PRZESYLKI AS P WITH(NOLOCK) ON LP.PRZESYLKI_ID = P.ID_PRZESYLKI
								 INNER JOIN LISTY_LINIOWE_ZA_WY ZW WITH(NOLOCK) ON LL.ID_LISTY_LINIOWE = ZW.LISTY_LINIOWE_ID
                                 LEFT JOIN FAKTURY F WITH(NOLOCK) ON F.PRZESYLKA_ID = P.ID_PRZESYLKI
        WHERE LL.STAN LIKE 'O' 
		AND (CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) OR CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() + 1 AS DATE))
		AND ZW.MIEJSCE_ID = 1
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
};

const getDataOrdersDetails = async() => {
    try {
        let pool = await sql.connect(config)
        let data = await pool.request().query(`
        USE INTL_eSpeed

        SELECT DISTINCT
		P.ID_PRZESYLKI,
		CONCAT(SUM(PA.ILOSC),'x ', PA.DLUGOSC,'x', PA.SZEROKOSC,'x', PA.WYSOKOSC) WYMIARY
        FROM LISTY_LINIOWE AS LL WITH(NOLOCK) INNER JOIN LISTY_LINIOWE_ZA_WY ZW WITH(NOLOCK) ON LL.ID_LISTY_LINIOWE = ZW.LISTY_LINIOWE_ID  
								INNER JOIN LISTY_LINIOWE_POZ AS LP WITH(NOLOCK) ON LP.LISTY_LINIOWE_ID = LL.ID_LISTY_LINIOWE
								INNER JOIN PRZESYLKI AS P WITH(NOLOCK) ON LP.PRZESYLKI_ID = P.ID_PRZESYLKI
								INNER JOIN PACZKI AS PA WITH(NOLOCK) ON PA.PRZESYLKA_ID = P.ID_PRZESYLKI 
        WHERE LL.STAN LIKE 'O'
		AND (CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) OR CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() + 1 AS DATE))
		GROUP BY PA.DLUGOSC, PA.SZEROKOSC, PA.WYSOKOSC, P.ID_PRZESYLKI,PA.ILOSC, LL.ID_LISTY_LINIOWE, LP.ID_LISTY_LINIOWE_POZ,ZW.ID_LISTY_LINIOWE_ZA_WY
	UNION
		SELECT DISTINCT
		P.ID_PRZESYLKI,
		CONCAT(SUM(PA.ILOSC),'x ', PA.DLUGOSC,'x', PA.SZEROKOSC,'x', PA.WYSOKOSC) WYMIARY
		FROM PRZESYLKI AS P WITH(NOLOCK) INNER JOIN PACZKI AS PA WITH(NOLOCK) ON PA.PRZESYLKA_ID = P.ID_PRZESYLKI
        WHERE P.SLOT_1 LIKE 'TE_61'
		AND (CAST(P.PLAN_DATA_ZAL AS DATE) LIKE CAST(GETDATE() AS DATE) OR CAST(P.PLAN_DATA_ZAL AS DATE) LIKE CAST(GETDATE() + 1 AS DATE))
		GROUP BY PA.DLUGOSC, PA.SZEROKOSC, PA.WYSOKOSC, P.ID_PRZESYLKI,PA.ILOSC
	UNION
		SELECT DISTINCT
		P.ID_PRZESYLKI,
		CONCAT(SUM(PA.ILOSC),'x ', PA.DLUGOSC,'x', PA.SZEROKOSC,'x', PA.WYSOKOSC) WYMIARY
		FROM PRZESYLKI AS P WITH(NOLOCK) INNER JOIN PACZKI AS PA WITH(NOLOCK) ON PA.PRZESYLKA_ID = P.ID_PRZESYLKI
        WHERE P.SLOT_1 LIKE 'ODB W'
		AND (CAST(P.PLAN_DATA_ROZ AS DATE) LIKE CAST(GETDATE() AS DATE) OR CAST(P.PLAN_DATA_ROZ AS DATE) LIKE CAST(GETDATE() + 1 AS DATE))
		GROUP BY PA.DLUGOSC, PA.SZEROKOSC, PA.WYSOKOSC, P.ID_PRZESYLKI,PA.ILOSC
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
}

// zapytania odnośnie przyjazdów/wyjazdów krajowych 

const getDataRoutesDomesticArrival= async() => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        USE INTL_eSpeed

        SELECT
        LL.ID_LISTY_LINIOWE,
        LL.NR_LISTU, 
        LL.SAMOCHOD, 
        LL.NACZEPA, 
        LL.PRZEWOZNIK, 
        ISNULL(left(cast(ZW.GODZ as time),5), '') PLAN_GODZ_ROZLAD_OD,
		ISNULL(LEFT(CAST(ZW.GODZ_DO AS time),5), '') PLAN_GODZ_ROZLAD_DO,
        LL.DZIAL, 
        LL.ILOSC_PRZESYLEK, 
        CASE WHEN LL.STATUS LIKE 'ZP' THEN 'TAK' ELSE 'NIE' END STATUS,
        CASE WHEN LL.GEN_ZAWY_OK = 1 THEN 'TAK' ELSE 'NIE' END GEN_ZAWY_OK,
        CASE WHEN LL.Magazynier_id = 0 then 0
			 WHEN LL.Magazynier_id is null then 0
			 else 1 end OBSLUGA,
        K.IMIE,
        CASE WHEN CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) THEN 0 ELSE 1 END CZAS,
        CAST(CONCAT(DATEDIFF(s,CAST(LL.Magazynier_DataCzas AS TIME) , CAST(GETDATE() AS TIME)), 0, 0, 0) AS INT) TIME,
		LL.ADR
        FROM LISTY_LINIOWE LL WITH(NOLOCK)
		INNER JOIN LISTY_LINIOWE_ZA_WY ZW WITH(NOLOCK) ON LL.ID_LISTY_LINIOWE = ZW.LISTY_LINIOWE_ID outer apply (
                        select 
                        CASE WHEN K.IMIE LIKE 'AGENCJA' THEN 'Tomasz'
                        ELSE K.IMIE END IMIE
                        from KIEROWCY K WITH(NOLOCK)
                        where K.ID_KIEROWCY = LL.Magazynier_id 
                        ) K
        WHERE LL.STAN LIKE 'O'
        AND LL.RODZAJ LIKE 'DORECZENIE'
		AND ZW.TYP LIKE 'WY'
		AND ZW.MIEJSCE_ID = 1
		AND (CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) OR CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() + 1 AS DATE))
        ORDER BY ZW.GODZ
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
};

const getDataRoutesDomesticDeparture = async() => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        USE INTL_eSpeed

        SELECT
        LL.ID_LISTY_LINIOWE,
        LL.NR_LISTU, 
        LL.SAMOCHOD, 
        LL.NACZEPA, 
        LL.PRZEWOZNIK, 
        ISNULL(left(cast(ZW.GODZ as time),5), '') PLAN_GODZ_ZALAD_OD,
		ISNULL(LEFT(CAST(ZW.GODZ_DO AS time),5), '') PLAN_GODZ_ZALAD_DO,
        LL.DZIAL, 
        LL.ILOSC_PRZESYLEK, 
        CASE WHEN LL.STATUS LIKE 'ZP' THEN 'TAK' ELSE 'NIE' END STATUS, 
        CASE WHEN LL.GEN_ZAWY_OK = 1 THEN 'TAK' ELSE 'NIE' END GEN_ZAWY_OK,
        CASE WHEN LL.Magazynier_id = 0 then 0
			 WHEN LL.Magazynier_id is null then 0
			 else 1 end OBSLUGA,
        K.IMIE,
        CASE WHEN CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) THEN 0 ELSE 1 END CZAS,
        CAST(CONCAT(DATEDIFF(s,CAST(LL.Magazynier_DataCzas AS TIME) , CAST(GETDATE() AS TIME)), 0, 0, 0) AS INT) TIME,
		LL.ADR
        FROM LISTY_LINIOWE LL WITH(NOLOCK)
        INNER JOIN LISTY_LINIOWE_ZA_WY ZW WITH(NOLOCK) ON LL.ID_LISTY_LINIOWE = ZW.LISTY_LINIOWE_ID outer apply (
                        select 
                        CASE WHEN K.IMIE LIKE 'AGENCJA' THEN 'Tomasz'
                        ELSE K.IMIE END IMIE
                        from KIEROWCY K WITH(NOLOCK)
                        where K.ID_KIEROWCY = LL.Magazynier_id 
                        ) K
        WHERE LL.STAN LIKE 'O' 
        AND LL.RODZAJ LIKE 'DORECZENIE' 
		AND ZW.TYP LIKE 'ZA'
		AND ZW.MIEJSCE_ID = 1
		AND (CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() AS DATE) OR CAST(ZW.DATA AS DATE) LIKE CAST(GETDATE() + 1 AS DATE))
        ORDER BY ZW.GODZ
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
};

// QUESTIONS FOR CALENDAR DATA

const getDataCalendar = async() => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        USE INTL_eSpeed

        SELECT DISTINCT
        LL.ID_LISTY_LINIOWE id,
		CONCAT(CASE WHEN LL.DZIAL LIKE 'PRL' THEN 'BULL' ELSE LL.DZIAL END, ' // ', CASE WHEN LL.NACZEPA LIKE '' THEN LL.SAMOCHOD ELSE LL.NACZEPA END) title,
		CASE WHEN LL.DZIAL LIKE 'TURCJA' THEN '#d6dad6'
			 WHEN LL.DZIAL LIKE 'TREX' THEN '#a3e790'
			 WHEN LL.DZIAL LIKE 'BLUE' THEN '#59bce4'
			 WHEN LL.DZIAL LIKE 'KRAJ' THEN '#fdfdfd'
			 WHEN LL.DZIAL LIKE 'XDOCK' THEN '#f5c27c'
			 WHEN LL.DZIAL LIKE 'PRL' THEN '#dd7f7f'
			 WHEN LL.DZIAL LIKE 'JUKEJ' THEN '#b671b6'
			 WHEN LL.DZIAL LIKE 'COMBI' THEN '#9d42d1'
			 ELSE '' END backgroundColor,
		CAST(ZW.DATA AS DATE) start,
        'black' textColor,
        CASE WHEN LL.DZIAL LIKE 'KRAJ' THEN 1 ELSE 0 END ORD
        FROM LISTY_LINIOWE LL WITH(NOLOCK) INNER JOIN LISTY_LINIOWE_ZA_WY ZW WITH(NOLOCK) ON LL.ID_LISTY_LINIOWE = ZW.LISTY_LINIOWE_ID
        WHERE LL.STAN LIKE 'O'
		AND ZW.MIEJSCE_ID = 1
		AND CAST(ZW.DATA AS DATE) >= CAST(GETDATE() AS DATE)
		AND (ZW.TYP LIKE 'ZA' OR ZW.TYP LIKE 'WY')
        UNION
		SELECT 
        P.ID_PRZESYLKI, 
        CONCAT('DOW WŁA. ', P.KLIENT_NAD_SYMBOL) title,
		'#e0de52' backgroundColor,
		CAST(P.PLAN_DATA_ZAL AS DATE) start,
		'black' textColor,
		2 ORD
		FROM PRZESYLKI AS P WITH(NOLOCK) LEFT JOIN FAKTURY F WITH(NOLOCK) ON F.PRZESYLKA_ID = P.ID_PRZESYLKI
        WHERE P.SLOT_2 LIKE 'TE_61'
		AND P.SLOT_2 LIKE 'TE_2'
		AND CAST(P.PLAN_DATA_ZAL AS DATE) >= CAST(GETDATE() AS DATE)
   UNION
        SELECT 
        P.ID_PRZESYLKI, 
        CONCAT('ODB WŁA. ', P.KLIENT_ODB_SYMBOL) title,
		'#e0de52' backgroundColor,
		CAST(P.PLAN_DATA_ROZ AS DATE) start,
		'black' textColor,
		2 ORD
		-- // -1 bez przedpłaty // 0 nie zapłacono // 1 zapłacono // 2 zapłacono warunkowo
		FROM PRZESYLKI AS P WITH(NOLOCK) LEFT JOIN FAKTURY F WITH(NOLOCK) ON F.PRZESYLKA_ID = P.ID_PRZESYLKI
        WHERE P.SLOT_4 LIKE 'ODB W'
		AND CAST(P.PLAN_DATA_ROZ AS DATE) >= CAST(GETDATE() AS DATE)
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
};

const getSelfCollectionAndDeliveryData = async () => {
    try {
        let pool = await sql.connect(config);
        let data = await pool.request().query(`
        USE INTL_eSpeed

        SELECT 
        P.DZIAL,
		'DOWOZ' CO,
		P.NR_PRZESYLKI,
        P.ID_PRZESYLKI,
		CASE WHEN P.CELNA = 1 THEN P.POTW_ODPR ELSE 999 END CELNA,
        P.ILOSC_DEKL,
        ROUND(P.WAGA_DEKL, 2) WAGA,
		P.KLIENT_NAD_SYMBOL,
		P.KLIENT_ODB_SYMBOL,
        CASE WHEN F.FORMA_PLATNOSCI LIKE 'PRZEDPŁATA' THEN (CASE WHEN F.ZAPLACONO = 1 THEN 1 ELSE (CASE WHEN STATUS_NEW LIKE 'WAR' THEN 2 ELSE 0 END) END) ELSE 999 END PLATNOSC,
		CASE WHEN CAST(P.PLAN_DATA_ZAL AS DATE) LIKE CAST(GETDATE() AS DATE) THEN 1
			 WHEN CAST(P.PLAN_DATA_ZAL AS DATE) LIKE CAST(GETDATE() + 1 AS DATE) THEN 2
			 ELSE 0 END KIEDY,
		P.PLAN_DATA_ZAL
		-- // -1 bez przedpłaty // 0 nie zapłacono // 1 zapłacono // 2 zapłacono warunkowo
		FROM PRZESYLKI AS P WITH(NOLOCK) LEFT JOIN FAKTURY F WITH(NOLOCK) ON F.PRZESYLKA_ID = P.ID_PRZESYLKI
        WHERE P.SLOT_1 LIKE 'TE_61'
		AND P.SLOT_3 NOT LIKE 'TE_2'
		AND CAST(P.PLAN_DATA_ZAL AS DATE) >= CAST(GETDATE() AS DATE)
        UNION
        SELECT 
        P.DZIAL,
		'ODBIOR' CO,
		P.NR_PRZESYLKI,
        P.ID_PRZESYLKI,
		CASE WHEN P.CELNA = 1 THEN P.POTW_ODPR ELSE 999 END CELNA,
        P.ILOSC_DEKL,
        ROUND(P.WAGA_DEKL, 2) WAGA,
		P.KLIENT_NAD_SYMBOL,
		P.KLIENT_ODB_SYMBOL,
        CASE WHEN F.FORMA_PLATNOSCI LIKE 'PRZEDPŁATA' THEN (CASE WHEN F.ZAPLACONO = 1 THEN 1 ELSE (CASE WHEN STATUS_NEW LIKE 'WAR' THEN 2 ELSE 0 END) END) ELSE 999 END PLATNOSC,
		CASE WHEN CAST(P.PLAN_DATA_ROZ AS DATE) LIKE CAST(GETDATE() AS DATE) THEN 1
			 WHEN CAST(P.PLAN_DATA_ROZ AS DATE) LIKE CAST(GETDATE() + 1 AS DATE) THEN 2	 
			 ELSE 0 END KIEDY,
		P.PLAN_DATA_ROZ
		-- // -1 bez przedpłaty // 0 nie zapłacono // 1 zapłacono // 2 zapłacono warunkowo
		FROM PRZESYLKI AS P WITH(NOLOCK) LEFT JOIN FAKTURY F WITH(NOLOCK) ON F.PRZESYLKA_ID = P.ID_PRZESYLKI
        WHERE P.SLOT_4 LIKE 'ODB W'
		AND CAST(P.PLAN_DATA_ROZ AS DATE) >= CAST(GETDATE() AS DATE)
        `)
        return data
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {
    getDataRoutesImports,
    getDataRoutesExports,
    getDataRoutesDomesticArrival,
    getDataRoutesDomesticDeparture,
    getDataCalendar,
    getDataOrders,
    getDataOrdersDetails,
    getSelfCollectionAndDeliveryData,
    getDataDashboard,
    insertIndexDashboard,
    insertRampDashboard
};



