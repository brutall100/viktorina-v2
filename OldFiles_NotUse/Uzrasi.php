<!-- 1 uzduotis -->
<!-- Tvarkyti atsijungimo BTN , Padryti prisijungimo BTN   -->

<!-- 2 -->
<!--  Klausimus perkleti i pagrindine db galima tik nuo 4 lvl . Mygtuka matoma ir aktyvu nuo 4 lvl
Ir balsaviam su didesniu kiekiu padaryti tai yra kai parbalsuoja kokie 15 zmoniu tik tada perkelti-->

<!-- 3 -->
<!--  Sutvarkyti modal foldery. isikelti i githuba GRAZIai -->

<!-- 4 -->
<!-- Reikia didesnio valdymo paslepto atsakymo, asterikso arba kvadratuko.O gal visai ne...... 
Padaryti atverciamas tik 4 raides apie 40sekunziu paleisti funkcija po 40 kad parodyti atsakyma, input disabled, reload after 45 seconds from async-->

<!-- 5 -->
<!--  -->

<!-- 6 -->
<!-- Padarti i statistic.php menesio top savaites top dienos top  top 10 irasysiu klausimus nusinulina 12 nakties -->

<!-- 7 -->
<!-- Full screen api ,kad vaizdas butu per visa ekrana -->

<!-- 8 -->
<!-- Css padaryti kad baigiantis laikui klausimas prades nykti ir mazeti ir nubrgs i desny kampa apacioj  -->

<!-- 9 -->
<!-- sukurti ikoneles useriams su daug litu,galima butu
nusipirkti is storo uz litus,plius gender ikoneles.Taippat galima pirkti store -->

<!-- 10 -->
<!-- Kosmetinis saito sutvarkymas .Dizaino paieskos ir.t.t -->

<!-- 11 -->
<!-- Reikia else dadeti, niekas neatsake teisingai. Kitas klausimas po 3 sekundziu -->

<!-- 12 -->
<!-- sukurti 3-5 geimusmus -->

<!-- 13 -->
<!-- Sutvarkyti litu galunes  Teisingai atsakė tadas: Gagarinas tadas gauna 52 litus -->

<!-- 14 -->
<!--  -->

<!-- 15 -->
<!-- Button perkelti padaryti prieinama nuo 4 lvl -->

<!--16 -->
<!-- Padaryti kad butu galima isjungti games.Visus game -->

<!-- 17 -->
<!-- Uz klausimo irasyma 10 litu + Ikonele kokia 1 savatei klausimu irasytojas + mini taisykles -->

<!-- 18 -->
<!-- Rasant atsakyma raides nuo vidurio rasytusi ir eitu i kaire pagrindinaime puslapyje -->

<!-- 19 -->
<!-- -->

<!-- 20 -->
<!-- b_newquestion.php cia iskylantis phhp puslapis reikia sutvarkyti zinute, prideti css pagrazinti,
pridet laika beganti atgal, kad esi nukreipiamas atgal i klausimo irasymo page, prideti zvaigzdute klausimo irasytojas,
reikia atskirt css kazkaip gal bendra raide dadeti  -->

<!-- 21 -->
<!-- Pirmo game isvaizda padaryti gera ir automatiskai uzdaryti uz 3 sekunds -->

<!-- 22 -->
<!-- Padaryti tavo today points grazu atvaizdavima .Sios dienos tavo surinti taskai -->

<!-- 23 -->
<!-- 3 zaidimas bus is papildomo klausimo. Papildomas klausimas bus ilgieji irasyti klausimai, klausimai kuriu ilgis virs xxx simboliu bus papildomame zaidime. -->








<!-- Recapha    apsauga -->
reCAPTCHA is a free service from Google that helps protect websites from spam and abuse. It uses advanced risk analysis techniques to tell humans and bots apart. With the new API, a significant number of your valid human users will pass the reCAPTCHA challenge without having to solve a CAPTCHA. reCAPTCHA offers more than just spam protection. It can also be used for security purposes like to prevent bots from trying to login to your site.

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

In your PHP script, you will need to verify the reCAPTCHA response by making a request to the reCAPTCHA server. You can use the file_get_contents() function to get the response.

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
$context  = stream_context_create($options);
$verify = file_get_contents($url, false, $context);
$captcha_success=json_decode($verify);
if ($captcha_success->success==false) {
    // code for when the CAPTCHA fails
} else if ($captcha_success->success==true) {
    // code for when the CAPTCHA passes
}
You need to replace 'your_secret_key' with the Secret key that you obtained from the reCAPTCHA website.

This is just a basic example of how to add a reCAPTCHA to your form, you can customize it according to your requirements.

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
                                                        Irasyti grandineles klausima-->