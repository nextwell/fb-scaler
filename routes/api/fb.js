let express = require("express"),
    db = require("./../../db"),
    request = require("async-request"),
    cfg = require("./../../config"),
    router = express.Router();

//----------------------------------------------------------------------------------------
// users routes



router.get("/targeting/category/life-events/:userid", async (req, res) => {
    let id = req.params.userid
    let errors = []

    let user = await db.Users.get_by_id(id)
    if (user) {
        let proxy = await db.Proxies.get_by_id(user.proxy_id)
        if (proxy) {

            let document = await request(`https://graph.facebook.com/${cfg.api_version}/search?type=adTargetingCategory&class=life_events&access_token=${user.access_token}`,
                {
                    proxy: `http://${proxy.ip}:${proxy.port}`,
                    headers: { 'User-Agent': user.user_agent }
                })
            let data = JSON.parse(document.body)
            if (data) {
                if (data.error) {
                    errors.push(data.error.message)
                }
                else if (data.data) {
                    res.json({ success: true, data: data.data })
                }
                else errors.push("Wrong answer from Facebook API")
            }
            else errors.push("Wrong answer from Facebook API")
        } else errors.push("Proxy not found")
    } else errors.push("User not found")

    if (errors.length) res.json({ success: false, err: errors[0] })
})



router.get("/targeting/category/life-events", async (req, res) => {
    let data = [
        {
            "id": "6002714398172",
            "name": "Новобрачные (1 год)",
            "type": "life_events",
            "path": [
                "Новобрачные (1 год)"
            ],
            "description": "Пользователи, состоящие в браке менее 1 года",
            "audience_size": 19367724,
            "real_time_cluster": false
        },
        {
            "id": "6002714398772",
            "name": "Недавно помолвленные (6 месяцев)",
            "type": "life_events",
            "path": [
                "Недавно помолвленные (6 месяцев)"
            ],
            "description": "Люди, которые помолвлены менее 6 месяцев",
            "audience_size": 4091974,
            "real_time_cluster": false
        },
        {
            "id": "6002737124172",
            "name": "Вскоре день рождения",
            "type": "life_events",
            "path": [
                "День рождения",
                "Вскоре день рождения"
            ],
            "description": "Люди, у которых в течение ближайшей недели будет день рождения",
            "audience_size": 57859233,
            "real_time_cluster": true
        },
        {
            "id": "6003054185372",
            "name": "Недавно переехали",
            "type": "life_events",
            "path": [
                "Недавно переехали"
            ],
            "description": "Люди, которые указали в своих профилях новый город проживания в течение последних 6 месяцев.",
            "audience_size": 1285424,
            "real_time_cluster": false
        },
        {
            "id": "6003053984972",
            "name": "В отношениях на расстоянии",
            "type": "life_events",
            "path": [
                "В отношениях на расстоянии"
            ],
            "description": "Люди, которые находятся в отношениях на расстоянии",
            "audience_size": 10864085,
            "real_time_cluster": false
        },
        {
            "id": "6003053860372",
            "name": "Вдалеке от родного города",
            "type": "life_events",
            "path": [
                "Вдалеке от родного города"
            ],
            "description": "Люди, находящиеся вдали от родных городов",
            "audience_size": 163993712,
            "real_time_cluster": false
        },
        {
            "id": "6003053857372",
            "name": "Вдалеке от семьи",
            "type": "life_events",
            "path": [
                "Вдалеке от семьи"
            ],
            "description": "Люди, которые находятся в разлуке с семьей",
            "audience_size": 152144380,
            "real_time_cluster": false
        },
        {
            "id": "6003050226972",
            "name": "Новобрачные (6 месяцев)",
            "type": "life_events",
            "path": [
                "Новобрачные (6 месяцев)"
            ],
            "description": "Люди, состоящие в браке менее 6 месяцев",
            "audience_size": 10716677,
            "real_time_cluster": false
        },
        {
            "id": "6003050210972",
            "name": "Недавно помолвленные (1 год)",
            "type": "life_events",
            "path": [
                "Недавно помолвленные (1 год)"
            ],
            "description": "Люди, которые помолвлены менее 1 года",
            "audience_size": 6473426,
            "real_time_cluster": false
        },
        {
            "id": "6005232221572",
            "name": "В новых отношениях",
            "type": "life_events",
            "path": [
                "В новых отношениях"
            ],
            "description": "Люди, которые указали в своих профилях новое семейное положение в течение последних 6 месяцев",
            "audience_size": 3804125,
            "real_time_cluster": false
        },
        {
            "id": "6005149512172",
            "name": "Новая работа",
            "type": "life_events",
            "path": [
                "Новая работа"
            ],
            "description": "Люди, указавшие в своих профилях новое место работы за последние 6 месяцев",
            "audience_size": 389901,
            "real_time_cluster": false
        },
        {
            "id": "6012631862383",
            "name": "Недавно помолвленные (3 месяцев)",
            "type": "life_events",
            "path": [
                "Недавно помолвленные (3 месяцев)"
            ],
            "description": "Люди, которые помолвлены менее 3 месяцев",
            "audience_size": 2478749,
            "real_time_cluster": false
        },
        {
            "id": "6013133420583",
            "name": "Новобрачные (3 месяца)",
            "type": "life_events",
            "path": [
                "Новобрачные (3 месяца)"
            ],
            "description": "Пользователи, состоящие в браке менее 3 месяцев",
            "audience_size": 5657555,
            "real_time_cluster": false
        },
        {
            "id": "6017476616183",
            "name": "Годовщина в течение 30 дней",
            "type": "life_events",
            "path": [
                "Годовщина",
                "Годовщина в течение 30 дней"
            ],
            "description": "Люди, отмечающие годовщину семейных отношений (брак, сожительство и пр.) в течение следующих 30 дней",
            "audience_size": 6415446,
            "real_time_cluster": false
        },
        {
            "id": "6018207038583",
            "name": "Друзья недавно помолвленных людей",
            "type": "life_events",
            "path": [
                "Друзья",
                "Друзья недавно помолвленных людей"
            ],
            "description": "Друзья людей, у которых состоялась помолвка в течение последних 30 дней",
            "audience_size": 12370,
            "real_time_cluster": false
        },
        {
            "id": "6018207110383",
            "name": "Друзья молодоженов",
            "type": "life_events",
            "path": [
                "Друзья",
                "Друзья молодоженов"
            ],
            "description": "Друзья людей, которые вступили в брак в течение последних 30 дней",
            "audience_size": 35168,
            "real_time_cluster": false
        },
        {
            "id": "6018207224183",
            "name": "Друзья тех, кто недавно сменил место жительства",
            "type": "life_events",
            "path": [
                "Друзья",
                "Друзья тех, кто недавно сменил место жительства"
            ],
            "description": "Друзья людей, купивших дом или переехавших в течение последних 30 дней",
            "audience_size": 74498855,
            "real_time_cluster": false
        },
        {
            "id": "6018399723983",
            "name": "Годовщина в течение 31–60 дней",
            "type": "life_events",
            "path": [
                "Годовщина",
                "Годовщина в течение 31–60 дней"
            ],
            "description": "Люди, у которых в ближайшие 31–60 дней будет годовщина отношений (брака, гражданского брака и т. п.)",
            "audience_size": 8876265,
            "real_time_cluster": false
        },
        {
            "id": "6019684757183",
            "name": "Лучшие друзья людей, отмечающих дни рождения через месяц",
            "type": "life_events",
            "path": [
                "Друзья",
                "Лучшие друзья людей, отмечающих дни рождения через месяц"
            ],
            "description": "Лучшие друзья людей, у которых день рождения в ближайшие 7–30 дней",
            "audience_size": 425184418,
            "real_time_cluster": false
        },
        {
            "id": "6028556851383",
            "name": "Близкие друзья людей, которые отмечают дни рождения на этой неделе",
            "type": "life_events",
            "path": [
                "Друзья",
                "Близкие друзья людей, которые отмечают дни рождения на этой неделе"
            ],
            "description": "Лучшие друзья людей, у которых день рождения в ближайшие 0–7 дней",
            "audience_size": 192242118,
            "real_time_cluster": false
        },
        {
            "id": "6048267235783",
            "name": "Родившиеся в январе",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "День рождения в январе"
            ],
            "description": "Люди, отмечающие день рождения в январе",
            "audience_size": 282559853,
            "real_time_cluster": false
        },
        {
            "id": "6049083267183",
            "name": "Родившиеся в феврале",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в феврале"
            ],
            "description": "Люди, отмечающие день рождения в феврале",
            "audience_size": 158509643,
            "real_time_cluster": false
        },
        {
            "id": "6048026294583",
            "name": "Родившиеся в марте",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в марте"
            ],
            "description": "Люди, отмечающие день рождения в марте",
            "audience_size": 175137182,
            "real_time_cluster": false
        },
        {
            "id": "6048026275783",
            "name": "Родившиеся в апреле",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в апреле"
            ],
            "description": "Люди, отмечающие день рождения в апреле",
            "audience_size": 183861678,
            "real_time_cluster": false
        },
        {
            "id": "6048026061783",
            "name": "Родившиеся в мае",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "День рождения в мае"
            ],
            "description": "Люди, отмечающие день рождения в мае",
            "audience_size": 178384953,
            "real_time_cluster": false
        },
        {
            "id": "6048026229983",
            "name": "Родившиеся в июне",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в июне"
            ],
            "description": "Люди, отмечающие день рождения в июне",
            "audience_size": 159051130,
            "real_time_cluster": false
        },
        {
            "id": "6048808449583",
            "name": "Родившиеся в июле",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в июле"
            ],
            "description": "Люди, отмечающие день рождения в июле",
            "audience_size": 162137054,
            "real_time_cluster": false
        },
        {
            "id": "6048810966183",
            "name": "Родившиеся в августе",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в августе"
            ],
            "description": "Люди, отмечающие день рождения в августе",
            "audience_size": 166418084,
            "real_time_cluster": false
        },
        {
            "id": "6048810961183",
            "name": "Родившиеся в сентябре",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в сентябре"
            ],
            "description": "Люди, день рождения которых в сентябре",
            "audience_size": 156126106,
            "real_time_cluster": false
        },
        {
            "id": "6048810950583",
            "name": "Родившиеся в октябре",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в октябре"
            ],
            "description": "Люди, день рождения которых в октябре",
            "audience_size": 162362591,
            "real_time_cluster": false
        },
        {
            "id": "6048810938183",
            "name": "Родившиеся в ноябре",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в ноябре"
            ],
            "description": "Люди, день рождения которых в ноябре",
            "audience_size": 149931727,
            "real_time_cluster": false
        },
        {
            "id": "6048810914583",
            "name": "Родившиеся в декабре",
            "type": "life_events",
            "path": [
                "День рождения",
                "Месяц рождения",
                "Родившиеся в декабре"
            ],
            "description": "Люди, отмечающие день рождения в декабре",
            "audience_size": 183151229,
            "real_time_cluster": false
        },
        {
            "id": "6067770695583",
            "name": "Лучшие друзья женщин, у которых день рождения в ближайшие 0–7 дней",
            "type": "life_events",
            "path": [
                "Друзья",
                "Лучшие друзья женщин, у которых день рождения в ближайшие 0–7 дней"
            ],
            "description": "Лучшие друзья женщин, у которых день рождения в ближайшие 0–7 дней",
            "audience_size": 86046668,
            "real_time_cluster": false
        },
        {
            "id": "6067771337583",
            "name": "Лучшие друзья женщин, у которых день рождения в ближайшие 7–30 дней",
            "type": "life_events",
            "path": [
                "Друзья",
                "Лучшие друзья женщин, у которых день рождения в ближайшие 7–30 дней"
            ],
            "description": "Лучшие друзья женщин, у которых день рождения в ближайшие 7–30 дней",
            "audience_size": 206495039,
            "real_time_cluster": false
        },
        {
            "id": "6068382314583",
            "name": "Лучшие друзья мужчин, у которых день рождения в ближайшие 0–7 дней",
            "type": "life_events",
            "path": [
                "Друзья",
                "Лучшие друзья мужчин, у которых день рождения в ближайшие 0–7 дней"
            ],
            "description": "Лучшие друзья мужчин, у которых день рождения в ближайшие 0–7 дней",
            "audience_size": 118318765,
            "real_time_cluster": false
        },
        {
            "id": "6068382323383",
            "name": "Лучшие друзья мужчин, день рождения которых будет в ближайшие 7–30 дней",
            "type": "life_events",
            "path": [
                "Друзья",
                "Лучшие друзья мужчин, день рождения которых будет в ближайшие 7–30 дней"
            ],
            "description": "Лучшие друзья мужчин, у которых день рождения в ближайшие 7–30 дней",
            "audience_size": 277945512,
            "real_time_cluster": false
        }
    ]
    res.json(data)
})

router.get("/targeting/category/countries", async (req, res) => {
    let data = [
        {
            "key": "AD",
            "name": "Андорра",
            "type": "country",
            "country_code": "AD",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "AE",
            "name": "Объединенные Арабские Эмираты",
            "type": "country",
            "country_code": "AE",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "AF",
            "name": "Афганистан",
            "type": "country",
            "country_code": "AF",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "AG",
            "name": "Антигуа",
            "type": "country",
            "country_code": "AG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "AI",
            "name": "Ангилья",
            "type": "country",
            "country_code": "AI",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "AL",
            "name": "Албания",
            "type": "country",
            "country_code": "AL",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "AM",
            "name": "Армения",
            "type": "country",
            "country_code": "AM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "AN",
            "name": "Нидерландские Антильские острова",
            "type": "country",
            "country_code": "AN",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "AO",
            "name": "Ангола",
            "type": "country",
            "country_code": "AO",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "AQ",
            "name": "Антарктика",
            "type": "country",
            "country_code": "AQ",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "AR",
            "name": "Аргентина",
            "type": "country",
            "country_code": "AR",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "AS",
            "name": "Восточное Самоа",
            "type": "country",
            "country_code": "AS",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "AT",
            "name": "Австрия",
            "type": "country",
            "country_code": "AT",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "AU",
            "name": "Австралия",
            "type": "country",
            "country_code": "AU",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "AW",
            "name": "Аруба",
            "type": "country",
            "country_code": "AW",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "AX",
            "name": "Аландские острова",
            "type": "country",
            "country_code": "AX",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "AZ",
            "name": "Азербайджан",
            "type": "country",
            "country_code": "AZ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BA",
            "name": "Босния и Герцеговина",
            "type": "country",
            "country_code": "BA",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "BB",
            "name": "Барбадос",
            "type": "country",
            "country_code": "BB",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BD",
            "name": "Бангладеш",
            "type": "country",
            "country_code": "BD",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BE",
            "name": "Бельгия",
            "type": "country",
            "country_code": "BE",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "BF",
            "name": "Буркина-Фасо",
            "type": "country",
            "country_code": "BF",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "BG",
            "name": "Болгария",
            "type": "country",
            "country_code": "BG",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "BH",
            "name": "Бахрейн",
            "type": "country",
            "country_code": "BH",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BI",
            "name": "Бурунди",
            "type": "country",
            "country_code": "BI",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BJ",
            "name": "Бенин",
            "type": "country",
            "country_code": "BJ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BL",
            "name": "Сен-Бартельми",
            "type": "country",
            "country_code": "BL",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "BM",
            "name": "Бермудские Острова",
            "type": "country",
            "country_code": "BM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BN",
            "name": "Бруней",
            "type": "country",
            "country_code": "BN",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BO",
            "name": "Боливия",
            "type": "country",
            "country_code": "BO",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "BQ",
            "name": "Бонайре, Синт-Эстатиус и Саба",
            "type": "country",
            "country_code": "BQ",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "BR",
            "name": "Бразилия",
            "type": "country",
            "country_code": "BR",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "BS",
            "name": "Багамские острова",
            "type": "country",
            "country_code": "BS",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "BT",
            "name": "Бутан",
            "type": "country",
            "country_code": "BT",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BV",
            "name": "Остров Буве",
            "type": "country",
            "country_code": "BV",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "BW",
            "name": "Ботсвана",
            "type": "country",
            "country_code": "BW",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BY",
            "name": "Беларусь",
            "type": "country",
            "country_code": "BY",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "BZ",
            "name": "Белиз",
            "type": "country",
            "country_code": "BZ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "CA",
            "name": "Канада",
            "type": "country",
            "country_code": "CA",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "CC",
            "name": "Кокосовые острова (острова Килинг)",
            "type": "country",
            "country_code": "CC",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "CD",
            "name": "Демократическая Республика Конго",
            "type": "country",
            "country_code": "CD",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "CF",
            "name": "ЦАР",
            "type": "country",
            "country_code": "CF",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "CG",
            "name": "Республика Конго",
            "type": "country",
            "country_code": "CG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "CH",
            "name": "Швейцария",
            "type": "country",
            "country_code": "CH",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "CI",
            "name": "Кот д'Ивуар",
            "type": "country",
            "country_code": "CI",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "CK",
            "name": "Острова Кука",
            "type": "country",
            "country_code": "CK",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "CL",
            "name": "Чили",
            "type": "country",
            "country_code": "CL",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "CM",
            "name": "Камерун",
            "type": "country",
            "country_code": "CM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "CN",
            "name": "Китай",
            "type": "country",
            "country_code": "CN",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "CO",
            "name": "Колумбия",
            "type": "country",
            "country_code": "CO",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "CR",
            "name": "Коста-Рика",
            "type": "country",
            "country_code": "CR",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "CV",
            "name": "Кабо-Верде",
            "type": "country",
            "country_code": "CV",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "CW",
            "name": "Кюрасао",
            "type": "country",
            "country_code": "CW",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "CX",
            "name": "Остров Рождества",
            "type": "country",
            "country_code": "CX",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "CY",
            "name": "Кипр",
            "type": "country",
            "country_code": "CY",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "CZ",
            "name": "Чешская Республика",
            "type": "country",
            "country_code": "CZ",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "DE",
            "name": "Германия",
            "type": "country",
            "country_code": "DE",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "DJ",
            "name": "Джибути",
            "type": "country",
            "country_code": "DJ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "DK",
            "name": "Дания",
            "type": "country",
            "country_code": "DK",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "DM",
            "name": "Доминика",
            "type": "country",
            "country_code": "DM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "DO",
            "name": "Доминиаканская Республика",
            "type": "country",
            "country_code": "DO",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "DZ",
            "name": "Алжир",
            "type": "country",
            "country_code": "DZ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "EC",
            "name": "Эквадор",
            "type": "country",
            "country_code": "EC",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "EE",
            "name": "Эстония",
            "type": "country",
            "country_code": "EE",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "EG",
            "name": "Египет",
            "type": "country",
            "country_code": "EG",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "EH",
            "name": "Западная Сахара",
            "type": "country",
            "country_code": "EH",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "ER",
            "name": "Эритрея",
            "type": "country",
            "country_code": "ER",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "ES",
            "name": "Испания",
            "type": "country",
            "country_code": "ES",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "ET",
            "name": "Эфиопия",
            "type": "country",
            "country_code": "ET",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "FI",
            "name": "Финляндия",
            "type": "country",
            "country_code": "FI",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "FJ",
            "name": "Фиджи",
            "type": "country",
            "country_code": "FJ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "FK",
            "name": "Фолклендские острова",
            "type": "country",
            "country_code": "FK",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "FM",
            "name": "Федеративные Штаты Микронезии",
            "type": "country",
            "country_code": "FM",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "FO",
            "name": "Фарерские острова",
            "type": "country",
            "country_code": "FO",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "FR",
            "name": "Франция",
            "type": "country",
            "country_code": "FR",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "GA",
            "name": "Габон",
            "type": "country",
            "country_code": "GA",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GB",
            "name": "Великобритания",
            "type": "country",
            "country_code": "GB",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "GD",
            "name": "Гренада",
            "type": "country",
            "country_code": "GD",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GE",
            "name": "Грузия",
            "type": "country",
            "country_code": "GE",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GF",
            "name": "Французская Гвиана",
            "type": "country",
            "country_code": "GF",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "GG",
            "name": "Гернси",
            "type": "country",
            "country_code": "GG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GH",
            "name": "Гана",
            "type": "country",
            "country_code": "GH",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GI",
            "name": "Гибралтар",
            "type": "country",
            "country_code": "GI",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "GL",
            "name": "Гренландия",
            "type": "country",
            "country_code": "GL",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GM",
            "name": "Гамбия",
            "type": "country",
            "country_code": "GM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GN",
            "name": "Гвинея",
            "type": "country",
            "country_code": "GN",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GP",
            "name": "Гваделупа",
            "type": "country",
            "country_code": "GP",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "GQ",
            "name": "Экваториальная Гвинея",
            "type": "country",
            "country_code": "GQ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GR",
            "name": "Греция",
            "type": "country",
            "country_code": "GR",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "GS",
            "name": "Южная Джорджия и Южные Сандвичевы острова",
            "type": "country",
            "country_code": "GS",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "GT",
            "name": "Гватемала",
            "type": "country",
            "country_code": "GT",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "GU",
            "name": "Гуам",
            "type": "country",
            "country_code": "GU",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "GW",
            "name": "Гвинея-Бисау",
            "type": "country",
            "country_code": "GW",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "GY",
            "name": "Гайана",
            "type": "country",
            "country_code": "GY",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "HK",
            "name": "Гонконг",
            "type": "country",
            "country_code": "HK",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "HM",
            "name": "Остров Херд и Острова Макдоналд",
            "type": "country",
            "country_code": "HM",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "HN",
            "name": "Гондурас",
            "type": "country",
            "country_code": "HN",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "HR",
            "name": "Хорватия",
            "type": "country",
            "country_code": "HR",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "HT",
            "name": "Гаити",
            "type": "country",
            "country_code": "HT",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "HU",
            "name": "Венгрия",
            "type": "country",
            "country_code": "HU",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "ID",
            "name": "Индонезия",
            "type": "country",
            "country_code": "ID",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "IE",
            "name": "Ирландия",
            "type": "country",
            "country_code": "IE",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "IL",
            "name": "Израиль",
            "type": "country",
            "country_code": "IL",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "IM",
            "name": "Остров Мэн",
            "type": "country",
            "country_code": "IM",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "IN",
            "name": "Индия",
            "type": "country",
            "country_code": "IN",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "IO",
            "name": "Британская территория в Индийском океане.",
            "type": "country",
            "country_code": "IO",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "IQ",
            "name": "Ирак",
            "type": "country",
            "country_code": "IQ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "IS",
            "name": "Исландия",
            "type": "country",
            "country_code": "IS",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "IT",
            "name": "Италия",
            "type": "country",
            "country_code": "IT",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "JE",
            "name": "Джерси",
            "type": "country",
            "country_code": "JE",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "JM",
            "name": "Ямайка",
            "type": "country",
            "country_code": "JM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "JO",
            "name": "Иордания",
            "type": "country",
            "country_code": "JO",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "JP",
            "name": "Япония",
            "type": "country",
            "country_code": "JP",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "KE",
            "name": "Кения",
            "type": "country",
            "country_code": "KE",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "KG",
            "name": "Киргизия",
            "type": "country",
            "country_code": "KG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "KH",
            "name": "Камбоджа",
            "type": "country",
            "country_code": "KH",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "KI",
            "name": "Кирибати",
            "type": "country",
            "country_code": "KI",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "KM",
            "name": "Коморские острова",
            "type": "country",
            "country_code": "KM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "KN",
            "name": "Сент-Китс и Невис",
            "type": "country",
            "country_code": "KN",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "KR",
            "name": "Южная Корея",
            "type": "country",
            "country_code": "KR",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "KW",
            "name": "Кувейт",
            "type": "country",
            "country_code": "KW",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "KY",
            "name": "Каймановы острова",
            "type": "country",
            "country_code": "KY",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "KZ",
            "name": "Казахстан",
            "type": "country",
            "country_code": "KZ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LA",
            "name": "Лаос",
            "type": "country",
            "country_code": "LA",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LB",
            "name": "Ливан",
            "type": "country",
            "country_code": "LB",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LC",
            "name": "Сент-Люсия",
            "type": "country",
            "country_code": "LC",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "LI",
            "name": "Лихтеншетйн",
            "type": "country",
            "country_code": "LI",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LK",
            "name": "Шри-Ланка",
            "type": "country",
            "country_code": "LK",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LR",
            "name": "Либерия",
            "type": "country",
            "country_code": "LR",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LS",
            "name": "Лесото",
            "type": "country",
            "country_code": "LS",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LT",
            "name": "Литва",
            "type": "country",
            "country_code": "LT",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LU",
            "name": "Люксембург",
            "type": "country",
            "country_code": "LU",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LV",
            "name": "Латвия",
            "type": "country",
            "country_code": "LV",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "LY",
            "name": "Ливия",
            "type": "country",
            "country_code": "LY",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MA",
            "name": "Марокко",
            "type": "country",
            "country_code": "MA",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MC",
            "name": "Монако",
            "type": "country",
            "country_code": "MC",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MD",
            "name": "Молдова",
            "type": "country",
            "country_code": "MD",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "ME",
            "name": "Черногория",
            "type": "country",
            "country_code": "ME",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MF",
            "name": "Сен-Мартен",
            "type": "country",
            "country_code": "MF",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "MG",
            "name": "Мадагаскар",
            "type": "country",
            "country_code": "MG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MH",
            "name": "Маршалловы острова",
            "type": "country",
            "country_code": "MH",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MK",
            "name": "Македония",
            "type": "country",
            "country_code": "MK",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "ML",
            "name": "Мали",
            "type": "country",
            "country_code": "ML",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MM",
            "name": "Мьянма",
            "type": "country",
            "country_code": "MM",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "MN",
            "name": "Монголия",
            "type": "country",
            "country_code": "MN",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MO",
            "name": "Макао",
            "type": "country",
            "country_code": "MO",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "MP",
            "name": "Северные Марианские острова",
            "type": "country",
            "country_code": "MP",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "MQ",
            "name": "Мартиника",
            "type": "country",
            "country_code": "MQ",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "MR",
            "name": "Мавритания",
            "type": "country",
            "country_code": "MR",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MS",
            "name": "Монтсеррат",
            "type": "country",
            "country_code": "MS",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "MT",
            "name": "Мальта",
            "type": "country",
            "country_code": "MT",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MU",
            "name": "Маврикий",
            "type": "country",
            "country_code": "MU",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MV",
            "name": "Мальдивы",
            "type": "country",
            "country_code": "MV",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MW",
            "name": "Малави",
            "type": "country",
            "country_code": "MW",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "MX",
            "name": "Мексика",
            "type": "country",
            "country_code": "MX",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "MY",
            "name": "Малайзия",
            "type": "country",
            "country_code": "MY",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "MZ",
            "name": "Мозамбик",
            "type": "country",
            "country_code": "MZ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "NA",
            "name": "Намибия",
            "type": "country",
            "country_code": "NA",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "NC",
            "name": "Новая Каледония",
            "type": "country",
            "country_code": "NC",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "NE",
            "name": "Нигер",
            "type": "country",
            "country_code": "NE",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "NF",
            "name": "Остров Норфолк",
            "type": "country",
            "country_code": "NF",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "NG",
            "name": "Нигерия",
            "type": "country",
            "country_code": "NG",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "NI",
            "name": "Никарагуа",
            "type": "country",
            "country_code": "NI",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "NL",
            "name": "Нидерланды",
            "type": "country",
            "country_code": "NL",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "NO",
            "name": "Норвегия",
            "type": "country",
            "country_code": "NO",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "NP",
            "name": "Непал",
            "type": "country",
            "country_code": "NP",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "NR",
            "name": "Науру",
            "type": "country",
            "country_code": "NR",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "NU",
            "name": "Ниуэ",
            "type": "country",
            "country_code": "NU",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "NZ",
            "name": "Новая Зеландия",
            "type": "country",
            "country_code": "NZ",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "OM",
            "name": "Оман",
            "type": "country",
            "country_code": "OM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "PA",
            "name": "Панама",
            "type": "country",
            "country_code": "PA",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "PE",
            "name": "Перу",
            "type": "country",
            "country_code": "PE",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "PF",
            "name": "Французская Полинезия",
            "type": "country",
            "country_code": "PF",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "PG",
            "name": "Папуа – Новая Гвинея",
            "type": "country",
            "country_code": "PG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "PH",
            "name": "Филиппины",
            "type": "country",
            "country_code": "PH",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "PK",
            "name": "Пакистан",
            "type": "country",
            "country_code": "PK",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "PL",
            "name": "Польша",
            "type": "country",
            "country_code": "PL",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "PM",
            "name": "Сен-Пьер и Микелон",
            "type": "country",
            "country_code": "PM",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "PN",
            "name": "Питкэрн",
            "type": "country",
            "country_code": "PN",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "PR",
            "name": "Пуэрто-Рико",
            "type": "country",
            "country_code": "PR",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "PS",
            "name": "Палестина",
            "type": "country",
            "country_code": "PS",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "PT",
            "name": "Португалия",
            "type": "country",
            "country_code": "PT",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "PW",
            "name": "Палау",
            "type": "country",
            "country_code": "PW",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "PY",
            "name": "Парагвай",
            "type": "country",
            "country_code": "PY",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "QA",
            "name": "Катар",
            "type": "country",
            "country_code": "QA",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "RE",
            "name": "Реюньон",
            "type": "country",
            "country_code": "RE",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "RO",
            "name": "Румыния",
            "type": "country",
            "country_code": "RO",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "RS",
            "name": "Сербия",
            "type": "country",
            "country_code": "RS",
            "supports_region": false,
            "supports_city": true
        },
        {
            "key": "RU",
            "name": "Россия",
            "type": "country",
            "country_code": "RU",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "RW",
            "name": "Руанда",
            "type": "country",
            "country_code": "RW",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SA",
            "name": "Саудовская Аравия",
            "type": "country",
            "country_code": "SA",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "SB",
            "name": "Соломоновы острова",
            "type": "country",
            "country_code": "SB",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SC",
            "name": "Сейшелы",
            "type": "country",
            "country_code": "SC",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SE",
            "name": "Швеция",
            "type": "country",
            "country_code": "SE",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "SG",
            "name": "Сингапур",
            "type": "country",
            "country_code": "SG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SH",
            "name": "Остров Святой Елены",
            "type": "country",
            "country_code": "SH",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SI",
            "name": "Словения",
            "type": "country",
            "country_code": "SI",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SJ",
            "name": "Шпицберген и Ян-Майен",
            "type": "country",
            "country_code": "SJ",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "SK",
            "name": "Словакия",
            "type": "country",
            "country_code": "SK",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SL",
            "name": "Сьерра-Леоне",
            "type": "country",
            "country_code": "SL",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SM",
            "name": "Сан-Марино",
            "type": "country",
            "country_code": "SM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SN",
            "name": "Сенегал",
            "type": "country",
            "country_code": "SN",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SO",
            "name": "Сомали",
            "type": "country",
            "country_code": "SO",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SR",
            "name": "Суринам",
            "type": "country",
            "country_code": "SR",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SS",
            "name": "Южный Судан",
            "type": "country",
            "country_code": "SS",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "ST",
            "name": "Сан-Томе и Принсипи",
            "type": "country",
            "country_code": "ST",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "SV",
            "name": "Сальвадор",
            "type": "country",
            "country_code": "SV",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "SX",
            "name": "Сент-Маартен",
            "type": "country",
            "country_code": "SX",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "SZ",
            "name": "Свазиленд",
            "type": "country",
            "country_code": "SZ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TC",
            "name": "Острова Теркс и Кайкос",
            "type": "country",
            "country_code": "TC",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "TD",
            "name": "Чад",
            "type": "country",
            "country_code": "TD",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TF",
            "name": "Французские южные территории",
            "type": "country",
            "country_code": "TF",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "TG",
            "name": "Того",
            "type": "country",
            "country_code": "TG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TH",
            "name": "Таиланд",
            "type": "country",
            "country_code": "TH",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "TJ",
            "name": "Таджикистан",
            "type": "country",
            "country_code": "TJ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TK",
            "name": "Токелау",
            "type": "country",
            "country_code": "TK",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TL",
            "name": "Восточный Тимор",
            "type": "country",
            "country_code": "TL",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "TM",
            "name": "Туркмения",
            "type": "country",
            "country_code": "TM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TN",
            "name": "Тунис",
            "type": "country",
            "country_code": "TN",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TO",
            "name": "Тонга",
            "type": "country",
            "country_code": "TO",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TR",
            "name": "Турция",
            "type": "country",
            "country_code": "TR",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "TT",
            "name": "Тринидад и Тобаго",
            "type": "country",
            "country_code": "TT",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TV",
            "name": "Тувалу",
            "type": "country",
            "country_code": "TV",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "TW",
            "name": "Тайвань",
            "type": "country",
            "country_code": "TW",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "TZ",
            "name": "Танзания",
            "type": "country",
            "country_code": "TZ",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "UA",
            "name": "Украина",
            "type": "country",
            "country_code": "UA",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "UG",
            "name": "Уганда",
            "type": "country",
            "country_code": "UG",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "UM",
            "name": "Внешние малые острова США",
            "type": "country",
            "country_code": "UM",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "US",
            "name": "США",
            "type": "country",
            "country_code": "US",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "UY",
            "name": "Уругвай",
            "type": "country",
            "country_code": "UY",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "UZ",
            "name": "Узбекистан",
            "type": "country",
            "country_code": "UZ",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "VA",
            "name": "Государство Ватикан",
            "type": "country",
            "country_code": "VA",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "VC",
            "name": "Сен-Винсент и Гренадины",
            "type": "country",
            "country_code": "VC",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "VE",
            "name": "Венесуэла",
            "type": "country",
            "country_code": "VE",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "VG",
            "name": "Британские Виргинские острова",
            "type": "country",
            "country_code": "VG",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "VI",
            "name": "Американские Виргинские острова",
            "type": "country",
            "country_code": "VI",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "VN",
            "name": "Вьетнам",
            "type": "country",
            "country_code": "VN",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "VU",
            "name": "Вануату",
            "type": "country",
            "country_code": "VU",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "WF",
            "name": "Уоллис и Футуна",
            "type": "country",
            "country_code": "WF",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "WS",
            "name": "Самоа",
            "type": "country",
            "country_code": "WS",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "XK",
            "name": "Косово",
            "type": "country",
            "country_code": "XK",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "YE",
            "name": "Йемен",
            "type": "country",
            "country_code": "YE",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "YT",
            "name": "Майотта",
            "type": "country",
            "country_code": "YT",
            "supports_region": false,
            "supports_city": false
        },
        {
            "key": "ZA",
            "name": "ЮАР",
            "type": "country",
            "country_code": "ZA",
            "supports_region": true,
            "supports_city": true
        },
        {
            "key": "ZM",
            "name": "Замбия",
            "type": "country",
            "country_code": "ZM",
            "supports_region": true,
            "supports_city": false
        },
        {
            "key": "ZW",
            "name": "Зимбабве",
            "type": "country",
            "country_code": "ZW",
            "supports_region": true,
            "supports_city": false
        }
    ]
    res.json(data)
})
module.exports = router;



