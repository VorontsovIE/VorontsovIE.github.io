---
layout: page
title: Идеи проектов
permalink: /project_ideas/
---

Здесь вы можете найти идею для проекта на учебный год. Работать над ними предполагается в небольших группах от 1 до 3 человек; оптимум посередине.

У некоторых проектов уже есть альтернативы (конкуренты). Некоторые проекты могут оказаться слишком сложными для реализации или даже не иметь решения. Ни то, ни другое не является преградой к тому, чтобы работать над проектом, но вы должны заранее понимать эти ограничения. Если есть конкуренты - хорошо бы их проанализировать, чтобы сделать то, чего у них нет.

При выборе проекта думайте о двух вещах: как должен выглядеть MVP (ядро проекта, без которого ничего не сработает) и как выглядит идеальная версия проекта. Как правило, MVP реализуется довольно просто, идеальная версия - очень долго и сложно; оптимум посередине.

Этот список - результат коллективного творчества. Если у вас есть новые идеи проектов или комментарии по этим проектам - заходите в [репозиторий сайта](https://github.com/VorontsovIE/VorontsovIE.github.io) и открывайте пулл-реквест со своими исправлениями.

Дополнительно можете глянуть на сходный [список](https://www.sites.google.com/site/vpavlenkoinf/home/proekty), который делал Виталик Павленко.


# Проекты, как-то связанные с анализом данных, машинным обучением, визуализацией:

- Взять базу данных рукописных текстов (что-нибудь типа [IAM Handwriting Database](http://www.fki.inf.unibe.ch/databases/iam-handwriting-database)) и научиться понимать, какие тексты написаны одной рукой, какие - разными? Сделать на основе этого кластеризацию текстов, поиск по базе почерков, сегментацию фотографий-коллажей, где написаны тексты разных людей.

- Игрушка типа Pokemon GO, в которой вместо виртуальных покемонов надо распознавать голоса птиц / фотки растений.

  Можно обратить внимание на проект [iNaturalist](https://www.inaturalist.org) + [пост](https://spark-in.me/post/bird-voice-recognition-one) (там есть ссылки на датасет птичьих голосов и хорошую визуализацию спектрограмм голосов).
  Распознавание песен птиц - задача, неплохо решаемая нейросетями (но позывные крики, скорее всего, гораздо хуже распознаются). Распознавание растений может быть значительно сложнее, но его можно переложить на API существующих классификаторов.

- Классификатор, предсказывающий пол и национальность/страну рождения по ФИО

  Это нетривиально, учитывая, что в именах могут быть опечатки, вместо имён могут быть инициалы.
  Отличить “Саша Петров” от “Саша Петрова”, наверное, легко. А вот сказать какой вероятностью “Емельяненко Юл.А.” является мужчиной - уже сложнее.
  А что мы можем сказать про “Ярсу Майсурадзе Васил.”?

- Написать генератор аудиозаписей, которые разные люди слышат по-разному, как в известной записи [Yanni/Laurel](https://en.wikipedia.org/wiki/Yanny_or_Laurel).

  Это проект исследовательский; мне заранее неизвестно, решаема ли эта задача. Предполагаю, что можно сделать пару нейросетей, чем-то напоминающую GAN). Одна сетка ("ухо") должна распознавать фонемы, другая должна генерировать звуки так, что сетка даёт как можно более разные фонемы при накладывании фильтров, делающих "ухо" более восприимчивой к высоким или низким частотам.

- Предсказывать тэги для задач с codeforces.

- Генерация музыки с помощью RNN.

- Распознавание речи по губам

- Нейропоэт - алгоритм, пишущий стихи (для начала хотя бы на английском)

- Pic2pic нейросеть, дорисовывающая фасады зданий по наброску. Не вполне понятно, впрочем, хватит ли вычислительных мощностей.

- Интерполяция кадров для рисования анимации.

- Слова-паразиты - алгоритм, который по аудиозаписи считает, сколько раз встретилось то или иное слово, не проводя промежуточной конвертации в текст.

  Промежуточная задача - алгоритм, который говорит, произнесено ли в двух аудиозаписях одно и то же слово или нет.
  Проект рискованный, может и не получиться.

  Алгоритм может быть полезен для подсчета многомандатных выборов: там затруднительно считать бюллетени складыванием их в стопки, потому что на каждом несколько галок. Зато фамилию напротив каждой галочки озвучивают голосом, притом делает это один и тот же человек, что несколько упрощает задачу.

- Автоматическое разрезание записи концерта на отдельные номера. Разрезание аудиозаписи диалога на голоса двух людей.

  Особенно это задача сложна, если в промежутках между номерами концертов не тишина, а крики. Или если один номер переходит в другой почти без паузы. Тогда нужно научиться ухватывать "стиль" или "мелодию" и искать точки, где они сильно меняются.

  Разрезание диалога - тоже не самая простая задача, так как на паузы тут уже тяжело ориентироваться.

- Сервис для NLP-анализа научных статей.

  Какие термины нужно знать, чтобы её прочитать. Насколько сложным языком она написана. К каким тематикам относится и какие ключевые слова можно было бы добавить. Кого можно было бы порекомендовать в качестве рецензента. Выглядит ли статья устаревшей, судя по применяемой терминологии (классификатор, предсказывающий год написания статьи)?

- Анализ графа цитирований статей.

  Простор задач безграничен. Ну, например, найти знаковые для запрашиваемой тематики статьи и ключевых авторов. Также можно узнавать, какие университеты сотрудничают, объединять ученых в лаборатории, выявлять научных руководителей, строить научные биографии исследователей итд.

  По результатам работы можно выпустить интерактивный материал с результатами анализа.

  Данные гигантские, но не всегда хорошего качества.

- Динамика популярности и отношения к различным темам в новостной ленте или в ленте твиттера.

  Можем ли мы сказать, например, каким было соотношение одобрения и ругани в адрес закона о курении? А как это менялось со временем? Можно было бы написать отличный виджет для СМИ, демонстрирующий историю отношения к различным темам, а также степень накала обсуждений. Сложностей много...

  Во-первых, надо писать краулер новостной ленты, сайты могут сопротивляться попытке выгрузить у них эту информацию. И стоит понимать, что это ещё не big data, но уже большие данные.

  Во-вторых, нужен анализ тональности текста. Это, вероятно, несложная задача для текстов в соцсетях, посложнее для текстов в публицистических газетах и совсем сложно для текстов в деловых изданиях.

  В-третьих - и это самая сложная часть - нужно научиться разделять посты на тематики. Или хотя бы уметь искать тексты, которые связаны с поисковым запросом.

- Связанная задача - поиск разных освещений одной и той же новости, чтобы выдавать разным пользователям разные взгляды. Например, кому-то выдавать новости за, а кому-то - против повышения пенсионного возраста.
Желательно, чтобы подборки статей были консистентны. Если человек уже получил статью "за повышение", то и дальше должен получать статьи "за". Хорошо бы этот классификатор строить не только на том, в каком СМИ текст опубликован.

- Приложение, которое мониторит общественный транспорт на карте Яндекс.Транспорта, сверяет с расписанием их работы и автоматически пишет жалобы на непришедший автобус + считает статистику по маршрутам/районам.

  Проект немного рискованный, т.к. API яндекс.транспорта непубличный и нестабильный. Есть [библиотека](https://github.com/OwlSoul/YandexTransportWebdriverAPI-Python), которая получает данные от яндекса, но её работа может в какой-то момент поломаться; тогда её придется чинить, и это может быть непросто.

- Анализ данных Open Street Map с целью подсчета доли площади Москвы (отдельного района Москвы или другого города), занимаемой лесами, дорогами и парковками, домами, гаражами, магазинами. Создание интерактивного материала-игры, предлагающего угадать разбиение Москвы между разными типами пространств с публикацией результатов в соцсеть.

  Дополнительно можно распарсить [ГИС ЖКХ](https://dom.gosuslugi.ru/#!/houses) и построить карты высотности, возраста домов итп.

  Возможно, что такие штуки уже умеет делать [Carto](https://carto.com/).

- Написать бота для игры в [Codenames](http://codenames-game.ru/assets/images/resources/Codenames%20russian%20rules%20(compressed).pdf).

  Генерировать и угадывать ассоциации на пары слов с помощью word2vec довольно просто. А вот давать ассоциации на много слов, разбираться с омонимией, простраивать стратегию игры - это всё непросто. Кроме того, можно поэкспериментировать с разными типами векторных представлений слов.

- Написать нейросеть, которая в режиме реального времени предсказывает, какой ракурс получит больше лайков - и таким образом помогает делать хорошие фото.

# Компьютерное зрение

- Библиотека для Augmented Reality, производящая расчёт координат объекта, на который налеплена метка. Реализация с её помощью настолки типа "живых шахмат".

- Игрушечный self-driving.

- Генерировать и дешифровывать [автостереограммы](https://ru.wikipedia.org/wiki/Автостереограмма).

  Задача с некоторой математической составляющей. Не уверен, что есть готовый алгоритм дешифровки, так что может и не получиться, но скорее всего задача всё-таки решаемая.

# Мобильные приложения

- Songbook - создавать и удобно отображать подборки гитарных аккордов, доступные в сети и через мобильное приложение.

  В принципе, веб-сайты и приложения с похожим функционалом уже существует. Например, [Chordie](https://chordie.com/).

- Оцифровать настольную игру типа [Ханаби](https://tesera.ru/images/items/394151/rules_hanabi-rus.pdf). Написать бота, который играет в неё вместо живого игрока.

- Различные игры с геолокацией. Например, realtime морской бой, в котором расставлять и подстреливать корабли нужно, бегая по городу.

- Приложение для проведения игр типа [Бегущего Города](https://www.runcity.org/), но в режиме "каждый бегает, когда хочет". Приложение подбирает пакет вопросов в зависимости от геолокации и имеющегося в распоряжении игрока времени.

  Пакеты вопросов можно "позаимствовать" прямо с сайта соревнования.

- Приложение-помощник для участия в [Бегущем Городе](https://www.runcity.org/).

  Участник фотографирует книжку вопросов; приложение автоматически распознает текст и адреса, которые явно прописаны; наносит их на карту и предлагает несколько удачных маршрутов. Для вопросов-загадок позволяет пользователям вносить несколько вариантов разгадки и особым образом помечать их на карте. Расшаривает карту и фотографии страниц с вопросами со всеми участниками команды. Записывает трек перемещения, хранит ответы на вопросы и автоматически сохраняет временные метки, чтобы их внести в путевую книгу все вместе единовременно в конце соревнования.

- Сортировка фото-коллекций для параноиков.

  Задача: есть фотки, которые хочется рассортировать на хорошие/плохие с мобильного устройства, но выкладывать их в сеть нельзя по соображениям приватности, копировать на устройство тоже не хочется. Но можно сделать приложение, общающееся в локальной сети.

  В такой постановке проект получается очень простым, нужно придумывать, что ещё будет уметь делать приложение.

- Адаптация комиксов под мобильные.

  Приложение для удобного просмотра xkcd и других комиксов/подборок мемов. Нужно сформулировать, что значит "удобно"; т.е. чем это отличается от простого вывода картинок на экран. Работой с коллекциями? Умным масштабированием? Автоматическим парсингом специализированных сайтов?

- Приложение, показывающее подборку событий в городе.

  Вероятно, парсит агрегаторы событий и какие-то сайты театров/концертов/... + знает какие-то фильтры по интересам пользователя. Но нужно чуть больше конкретики.

# Веб-приложения и около

- Язык и редактор для создания текстовых квестов/ролёвок + телеграм-бот непосредственно для игры.

- Приложение, сводящее владельцев собак и людей, которые хотят их выгуливать. Бесплатный аналог "[Собаки-гуляки](https://dog-walk.ru/)"

- Мониторинг числа лайков к постам.

  Некоторые крупные компании мониторят динамику числа просмотров статей на хабре, написанных в их корпоративном блоге. Другим наверняка интересно, с какой скоростью растет число лайков на ютубе и в фейсбуке: так можно определять наиболее удачное время для публикации. Сделать агрегация статистики по соцсетям, чтобы видеть, сколько набрал каждый пост в vk, fb, twitter, ...

- Написать онлайн-редактор презентаций на базе [reveal.js](https://github.com/hakimel/reveal.js).

  Сделать возможность заводить шаблоны слайдов, расшаривать отдельные слайды друзьям, расставлять презентациям права доступа, делать предпросмотр для соц.сеток, синхронизировать презентации с github.

  Существует коммерческий аналог от автора библиотеки, который зовется [slides.com](https://slides.com/).

- Приложение для создания и расшаривания кастомных Points of Interest типа "любимый коворкинг Стёпы" и "смешное граффити с котом".

- Редактор математических формул, позволяющий упрощенно производить преобразования и поэтапно решать задачи (типа "сократили множитель", "подставили t вместо x^2", "продифференцировали") и записывать последовательность действий в TeX/pdf.

- Сделать плагин для [d3.js](https://github.com/d3/d3/wiki/Gallery), позволяющий рисовать интервалы (решения неравенств).

  Дополнительный бонус - рисование шкал в логарифмическом масштабе, с разрывами, подписями итд ([пример](https://upload.wikimedia.org/wikipedia/commons/f/f1/EM_spectrum.svg)).

- Интеграция vk и lastfm.

  Говорят, правда, что (заблокированный) vkopt это умел делать.

- Скачивалка музыки из vk.

  Есть проблема с тем, что их некоторое количество уже есть; надо думать, что уникального она будет делать.

- P2P-мессенджер, который отправляет сообщения либо напрямую между пользователями, либо если один из них офлайн - временно сохраняет (зашифрованные) сообщения на компьютерах пользователей в онлайне, чтобы доставить их позднее.

- Сервис для организации соревнований между ботами для пошаговых игр. Например, между покерными ботами, шахматными ботами итд.

  Должен быть простой интерфейс добавления игр. Разумеется, должны быть запись и отображение игр, ведение статистики, групповые соревнования итд. Должна быть возможность обращаться к боту, расположенному на удаленной машине.

- Браузерный плагин, для организации коллекций веб-страниц.

  Ну, например, вы решили почитать про специальную теорию относительности и открыли 20 вкладок. Было бы удобно сохранить их в отдельную папочку с иерархической группировкой и сортировкой. Сделать страницы доступными в офлайн-версии. Расшарить между устройствами. Собирать из них единую pdf и отправить на печать. Добавить в офлайн-версию все ссылки с текущей страницы (например, чтобы если в вики-статье встретился незнакомый термин, иметь возможность про него прочитать).

- Экскурсоводческая система, в которой все подключившиеся слышат экскурсовода через телефон и на экране видят его местоположение.

  Экскурсовод организует вызов, показывает с экрана QR-код, по которому подключаются все экскурсанты. Теперь всё, что он говорит, слышат все экскурсанты, даже если они находятся довольно далеко. В чате можно задавать вопросы. Экскурсовод может выводить на экраны слушателей справку о месте.

  В идеале система должна работать не только через мобильный интернет, но и через MESH-сеть. Такой проект переделывается в рацию для команды.

  Есть, конечно, конкуренты с более широким спектром применения: skype/discord, zello.

- Доработка интерактивной исторической карты [GeoHistory](https://geo-history.org/).

  Это уже существующий проект интерактивной исторической карты, который мои школьники делали пару лет назад на летней школе. Проект сырой и ему не хватает тысячи разных вещей, которые можно доделать от более эффективного обращения к серверу и фронтенда до внедрения функций типа исторических границ стран, редактора историй, анимации событий во времени.

  Есть [документ](https://docs.google.com/document/d/1ZEJTyPDmb10EaelVsctgBva0nbEXAS2TXFvQHjG3tcU/edit#) с некоторым количеством идей о том, чего не хватает, и ссылок на разные проекты.

  У проекта есть мощнейший конкурент [chronas](https://chronas.org/). Соревноваться с ним бесполезно, но можно придумать задачи, которые в том проекте не решены.

- Можно подключиться к разработке опенсорсных проектов.

  Например, есть проект [tablesorter](https://mottie.github.io/tablesorter/docs/), позволяющий "оживлять" таблички в браузере. Ему, определенно, не хватает плагина для иерархической группировки и ещё нескольких.

- Центр верификации сотрудников.

  Кейс: к вам приходит человек и говорит, что пришёл проверить газовое оборудование у вас дома. Вы хотите проверить, не мошенник ли он - и просите его показать документ. Но вы не знаете, как должен выглядеть настоящий документ, поэтому этот документ вам мало что говорит. Вместо этого можно сделать доверенный центр, в который фирмы заносят своих сотрудников с фото и списком обязанностей и подписывают своей цифровой подписью. Теперь сотруднику достаточно показать вам QR-код или дать ссылку - и вы сможете проверить, что он действительно тот, за кого себя выдает (при условии, что вы доверяете центру сертификации, а тот проверяет, что фирмы - те, за кого себя выдают).

  MVP довольно маленький, но дальше можно добавлять всякие вспомогательные опции. Например, можно делать сеть доверия вдобавок к центрам сертификации. Или позволять сотруднику прямо с телефона подписать вам своей подписью (и подписью компании) фотографию документа, который он вам выдает.

- Мессенджер, решающий проблему безотзывности контактов (см. [пояснение](https://vk.com/wall1213694_7626)), в котором для коммуникации вы выдаете не контакт, а токен, дающий человеку/компании право вам написать на протяжении определенного промежутка времени. Возможно, это должно реализовываться через телеграм-бот: с настройкой вам нельзя слать сообщения напрямую, а бот выдает и проверяет токены, чтобы пересылать вам только те сообщения, на которые вы выразили согласие.

- (~~извините, это вряд ли можно брать как школьный проект~~) Чат для тренировки разных стилей коммуникации.

  Подразделение гугла jigsaw выпустило [API](https://www.perspectiveapi.com/#/home) для определения уровня токсичности комментария, а также опубликовало [датасет](https://www.kaggle.com/c/jigsaw-unintended-bias-in-toxicity-classification/data) с размеченными комментариями. Предполагается, что этот продукт должен быть использован для того, чтобы форсить более дружелюбное общение, но... можно ведь делать и наоборот. Не давать пользователям писать нетоксичные сообщения. Ну а потом можно вводить ограничения: уровень токсичности комментария не больше такого-то, но и не ниже такого-то -- и учиться таким образом отрабатывать навыки троллинга и дипломатии.


# Железки

  - Система климат-контроля на Raspberry PI

# Сложно категоризуемые проекты

- Система электронного голосования.

  Вы, наверное, уже знаете, что электронное голосование - это сложно. Мы можем попробовать сделать (а может и взломать...) свою систему. Например, основанную на голоморфном шифровании, при котором бюллетени расшифровать нельзя, а результат узнать можно.

  Придется не только писать код, но и читать статьи о том, как криптографы предлагают делать подобные штуки. Проект легко может провалиться (дать ненадежную систему).

- Система микро-платежей для СМИ.

  Пользователь не оформляет подписку на одно издание, а читает тексты в разных изданиях, подключенных к системе. Встраиваемый в СМИ модуль регистирует, что к ним зашел авторизованный пользователь с установленным плагином - и отключает рекламу + показывает полный текст статьи, но начисляет небольшую сумму на счёт пользователя. В конце месяца деньги списываются в пользу всех СМИ, которые пользователь читал, пропорционально числу прочитанных статей.

  Немного спорный проект, так как придется экспериментировать с виртуальными "СМИ" и виртуальными деньгами.

- Программа для рисования графиков в консоли с помощью ASCII-графики.

  В первую очередь, конечно, интересуют графики на основе статистических данных, но математические функции тоже можно реализовать дополнительно.

- Приложение для складывания оригами. Показывает вам лист бумаги и позволяет его складывать прямо на экране, показывая, что получится. Записывает схему сборки и позволяет отобразить её в стандартном виде.

- Если вы вдруг считаете, что миру не хватает ещё одного языка программирования для ... не знаю даже зачем, то это обсуждаемо.

- Транспайлер, преобразующий код на Pascal в код на Python.

  Такие уже есть, стоит подумать, нужен ли ещё один, и если да, то чем он будет отличаться.

- Мониторинг запущенных процессов типа программы htop, но с сохранением логов, поиском дочерних процессов, рисованием графиков, веб-консолью итп.

- Стандартизация инфобоксов в википедии и извлечение данных из текста статей.

  В википедии есть множество различных инфобоксов, которые до сих пор плохо оцифрованы и не внесены в wikidata. Можно писать бота, который краулит википедию, парсит инфобоксы на разных языках и ищет разные виды шаблонов, содержащие информацию одного и того же типа (в статьях одних и тех же категорий, в переводах статьи на разные языки).
  Затем бот может заносить информацию в викиданные или искать расхождения между информацией в статьях на разных языках.

  Кроме того, можно проводить анализ самого текста статьи и пытаться извлечь оттуда информацию. Но это задача по-настоящему сложная, легко может не получиться.

- Миру не хватает онтологии (машиночитаемого языка) для описания биографий людей.

  В частности, чтобы можно было распарсить биографические статьи из википедии и записать их в стандартизованном виде - так, чтобы можно было рисовать таймлайны, рисовать перемещения человека между городами и странами, узнавать про связи с современниками.

- Упрощенный редактор музыки (Guitar Pro на минималках).

- Программа для конвертации между аккордами, табами и нотами, умеющая проигрывать соответствующие записи.

- Предсказание свойств химических веществ.

  Тут мне нужны пояснения: на основе чего предсказывать и какие свойства. Боюсь, это довольно непростой исследовательский проект не на один год. Впрочем, может быть, что какие-то штуки типа температуры плавления по формуле и можно предсказать - но это нужно посмотреть статьи, в которых про это рассказывается. Совсем без поддержки статьями, я бы не взялся.