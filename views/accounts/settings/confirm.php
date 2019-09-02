<? GetHeader('Изменение почты','');
if(empty($_SESSION['recovery'])) {
    go("/settings");
}

$error = [];
if(isset($_POST['confirm'])) {
    if(empty($_POST['code'])) {
        $error[] = '<p style="color:red;">Подтвердите ваш код который пришел вам на почту</p>';
    } else if($_POST['code'] != $_SESSION['recovery']['code']) {
        $error[] = '<p style="color:red;">Не верный код подтверждения</p>';
    } else {
        go("/settings");
        $error = "Ваш Email изменён. Вам было отправлено письмо с новым Email на ваш почтовый ящик.";
        $message = "Дорогой ".FixNames($_SESSION['user']['name']).", Ваш Email изменён. Ваш новый Email: ".$_SESSION['recovery']['new-email']." C Уважением, Техническая Поддержка Makkord RolePlay.";
        $subject = "Изменение Email";
        $mail = new PHPMailer;
        $mail->CharSet = 'UTF-8';

// Настройки SMTP
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPDebug = 0;

        $mail->Host = "ssl://server208.hosting.reg.ru";
        $mail->Port = 465;
        $mail->Username = "support@makkord-rp.ru";
        $mail->Password = "X5D!N6k";


// От кого
        $mail->setFrom('support@makkord-rp.ru', 'Makkord RolePlay - Техническая поддержка');

// Кому
        $mail->addAddress($_SESSION['user']['email'], '');

// Тема письма
        $mail->Subject = $subject;

// Тело письма
        $body = $message;
        $mail->msgHTML($body);

// Приложение
        $mail->addAttachment (__DIR__ . 'theme/images/logo.png');

        $mail->send();
        $user = R::load("accounts", "".$_SESSION['user']['id']."");
        $user->email = $_SESSION['recovery']['new-email'];
        R::store($user);
        unset($_SESSION['recovery']);
    }
}
?>

<section class="bg-primary" id="login-section">
    <div class="container">
        <div class="row">
            <div class="login-form">
                <div class="inner">
                    <h2>Изменение Email</h2>
                    <h4>На ваш почтовый ящик было отправлено письмо с кодом для подтверждения действия.</h4>
                    <br>
                    <form method="post">
                        <?
                        foreach ($error as $err) {
                            echo $err;
                        }
                        ?>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-addon"><span class="glyphicon glyphicon-user"></span> </div>
                                <input name="code" class="form-control" placeholder="Код доступа" required/>
                            </div>
                        </div>
                        <button  type="sumbit" name="confirm" class="btn btn-red">Подтвердить</button><br>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<? GetFooter(); ?>
