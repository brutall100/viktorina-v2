<!-- 0 uzduotis -->
<!-- Chate uz 10 zinuciu 1 litas, bet niekur neskelbti  -->


<!-- 1 uzduotis -->
<!-- Gal old question section nuo 2 ar 3 lvl???  + btn to hide/show OR MAYBE DONATED USER CAN USE THIS FUNCTIONALITY????? 
If donate 1 seen 3 old qna , if 3 seen 10 old qna, if 10 seen 30-->

<!-- 2 -->
<!-- Main question and answer has to asynchrounus and dont reload entire page -->

<!-- 3 -->
<!-- d_server.js patvirtinus pasta pagrazinti zinute, atskirti mail.js i kita faila prideti papildomas apsaugas 
per ilgas email per ilga lytis . Slaptazodis belenkokio ilgio. Sukurti slaptazodio priminimo Funkcija -->

<!-- 4 -->
<!-- -->

<!-- 5 -->
<!--  Old question sekcija.Sukurti DB kurioje tilptu senu koks 100 klausimu (gal 10)
Isiraso kai atsakoma i klausima arba kai niekas neatsako. o paskutini klausima 100 istrina is DB
Taip pat prideti atsakiusio zmoogaus varda, jei toks atsake. Simtas last question bus geriau -->

<!-- 6 -->
<!-- Padarti i statistic.php menesio top 10, savaites top 10, dienos top 10, irasysiu klausimus top 10 nusinulina 1 menesio diena,
Siuo metu yra tik bendras padarytas top. Aplamai menesio reik padaryti -->

<!-- 7 -->
<!-- Full screen api ,kad vaizdas butu per visa ekrana -->

<!-- 8 -->
<!-- Css padaryti kad baigiantis laikui klausimas prades nykti ir mazeti ir nubrgs i desny kampa apacioj ????????? Gal -->

<!-- 9 -->
<!-- sukurti ikoneles useriams su daug litu,galima butu
nusipirkti is storo uz litus,plius gender ikoneles.Taippat galima pirkti store -->

<!-- 10 -->
<!-- Paspaudus copyright nukreipiamas i pastabu pasiulymu , saito klaidu, klausimo klaidu puslapy, klausimas turi tureti id nr kad apie ji pranesti -->

<!-- 11 -->
<!-- Reikia else dadeti, niekas neatsake teisingai. Kitas klausimas po 3 sekundziu -->

<!-- 12 -->
<!-- Sukurti user info issokanti langa , jis kaip ir yra tik reikia tinkamai sutvarkyti.
 lvl, points, today points, place, email confirmed Kvadratinis langelis su kazkokiu pazymejimu -->

<!-- 13 -->
<!-- Sutvarkyti litu galunes  Teisingai atsakė tadas: Gagarinas tadas gauna 52 litus -->

<!-- 14 -->
<!--  Uz kieviena prabalsavima gauti 1 lita geriau puse lito. Bet gerai ir litas.-->

<!-- 15 -->
<!-- Slaptažodžio priminimas būtų kintamasis, kiekvienų metų laiu, būti vis ktoks. ty vasarą vienoks, rudenį kitoks ir t.t-->

<!--16 -->
<!-- Padaryti kad butu galima isjungti games.Visus game -->

<!-- 17 -->
<!--  -->

<!-- 18 -->
<!-- D regi logi Btn su padidinuimu turi buti, keisti spalva siek tiek, pamirsote slaptazody turi nukreipti i priminima, 
lyties inputa pagrazinti, pagenetravus name- pasw, neturi judeti visas ekranas, Sukurti db name + kas prisiregina nuimti 1 raide nuo priekio ir galo prideti random skaiciu 1-100 -->

<!-- 19 -->
<!-- Padaryti Bad word irasyma i db, nuo 5 lvl.tik nuo 5 lvl -->

<!-- 20 -->
<!--  -->

<!-- 21 -->
<!-- Irasant klausima ir atsakyma i db turi buti fiksuojamas zodzio ilgis.
Kad nebutu per ilgu zodziu. taip pat galima fiksuoti vienodas raides. ty jei trys is eiles vienodos raides,t.y ggg ir bus metama klaida -->

<!-- 22 -->
<!-- Sveikinimo zinute sutvarkyti ty welcome xxx your lvl your points position
Perkelti i html struktura -->

<!-- 23 -->
<!-- -->

<!-- 24 -->
<!-- -->

<!-- 25 -->
<!-- -->




<!-- Recapha    apsauga -->
reCAPTCHA is a free service from Google that helps protect websites from spam and abuse. It uses advanced risk analysis
techniques to tell humans and bots apart. With the new API, a significant number of your valid human users will pass the
reCAPTCHA challenge without having to solve a CAPTCHA. reCAPTCHA offers more than just spam protection. It can also be
used for security purposes like to prevent bots from trying to login to your site.

You can add a reCAPTCHA to your form by following these steps:

Go to the reCAPTCHA website (https://www.google.com/recaptcha/) and sign up for an API key pair for your site.

In the HTML form, add the reCAPTCHA widget by including the reCAPTCHA JavaScript API in the head of your HTML file.

Copy code

<head>
    <script src='https://www.google.com/recaptcha/api.js'></script>
</head>
In the form, add the reCAPTCHA widget by adding the following HTML element where you want the widget to appear.
Copy code
<div class="g-recaptcha" data-sitekey="your_site_key"></div>
Replace 'your_site_key' with the Site key that you obtained from the reCAPTCHA website.

In your PHP script, you will need to verify the reCAPTCHA response by making a request to the reCAPTCHA server. You can
use the file_get_contents() function to get the response.

Copy code
$response = $_POST["g-recaptcha-response"];
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
'secret' => 'your_secret_key',
'response' => $response
);
$options = array(
'http' => array (
'method' => 'POST',
'content' => http_build_query($data)
)
);
$context = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success=json_decode($verify);
if ($captcha_success->success==false) {
// code for when the CAPTCHA fails
} else if ($captcha_success->success==true) {
// code for when the CAPTCHA passes
}
You need to replace 'your_secret_key' with the Secret key that you obtained from the reCAPTCHA website.

This is just a basic example of how to add a reCAPTCHA to your form, you can customize it according to your
requirements.

<!-- / -->
<!-- Planai po ikelimo i web / -->

<!-- 1 -->
<!-- Gal GALBUT ateiciai reikes padaryti ,jei atsakymas iš 2 ar daugiau zodziu, kad ir tie zodziai atsiverstu kaip dabar pirmas zodis. -->

<!-- 2 -->
<!-- Trecias game (Galimai 4) bus zodziu grandinele. Reikia sukurti DB grandinelei. ir zaidima ir t.t -->
<!-- PVZ: Vieno perejimo pauksciai?   VADA
                   Arimo griovelis?   VAGA
                Drabuzius susegame?   SAGA
               isegamas papuosalas?   SAGĖ -->

<!-- 3 -->
<!-- Paspaudus irasyti klausima iskristu dropdown'as su Irasyti klausima
                                                        Irasyti grandineles klausima -->

<!-- 4 -->
<!-- Seimyniniai klausimai kiekviena seima gales sukurti db apie savo seima ir zaisti seimoje -->

<!-- 5 -->
<!-- Vaikiski klausimai vaiku db  vaikai patys gali rasyti klausimus -->

<!-- 6 -->
<!-- Statistic.php Viskas OK Šiek tiek CSS reiketų. Kolkas palieku -->

<!-- 7 -->
<!-- Pagrindiniame puslapyje galima pasirinkti clasikine viktorina, vaiku, seimos, muzikine, atranka i golden mind , super sunki tik ilgi klausimai ir tik sunkus -->

<!-- 8 -->
<!-- Game gal koks zymiu zmoniu foto, gal muzikinis klausimas, 
Muzikiniai zodziai Q..   O, svajokli mano mielas... A.. svajokli  ir galima paleisti muzika 5 sekundes tos dainos  jei atspejai  -->

<!-- 9 -->
<!-- Ikonele kokia 1 savatei klausimu irasytojas turetu buti ir kituose puslapiouse ir matoma visur
Dabar matoma tik klausimo irasymo puslapyje -->

<!-- 10 -->
<!-- Irasius klausima padaryti SVG besisukanty ar besikraunanty kokia 0.5s kad atseit matytusi ikraunamas klausimas.
Kolkas palieku, nes nebutina. Veikimo neitakoja. Stabilumui nekenkia. tik del grozio -->

<!-- 11 -->
<!-- Klausimu kurimas pasitelikiant ai klausimo ilgis tokenaais ir atsakymas. Klausimu kurimas pasitelkiant Ai nuo 3 lvl -->

<!-- 12 -->
<!-- For stoping Span we can create Db in wich we can somehow create <user can write only x mesages per day>
Lvl 0 user can write 20 msg 
Lvl 1 user can write 50 msg 
Lvl 2 user can write 500 msg
Lvl 3 user can write 5000 msg  or donated user can write Unlimited msg -->



<!-- TAISYKLES -->

<!-- 0 Lvl -->
<!-- 1 Lvl -->
<!-- 2 Lvl -->
<!-- 3 Lvl -->
<!-- 4 Lvl -->

<!-- 5 Lvl -->
<!-- User with max lvl can block user 0 lvl to write to chat if it not friendly. -->


<!-- Chate matomas zinuciu kiekis
0Lvl = 8, 1Lvl = 20, 2Lvl = 35, 3Lvl = 50, 4Lvl = 75, 5Lvl = 100,
User can write message to chat every 10 second -->
