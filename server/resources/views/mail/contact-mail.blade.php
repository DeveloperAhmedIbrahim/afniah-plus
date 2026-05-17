<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afniah+</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    
                    <!-- Header with Desert Theme -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2d5f4f 0%, #4a7c68 100%); padding: 40px 30px; text-align: center;">
                            <div style="background-color: rgba(255,255,255,0.1); display: inline-block; padding: 15px 30px; border-radius: 8px;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">
                                    Afniah+
                                </h1>
                            </div>
                        </td>
                    </tr>

                    <!-- Notification Badge -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; border-bottom: 3px solid #d4a574;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <h2 style="color: #2d5f4f; margin: 0; font-size: 22px; font-weight: 600;">
                                            📧 New Contact
                                        </h2>
                                        <p style="color: #666; margin: 8px 0 0 0; font-size: 14px;">
                                            You have received a new inquiry from your website
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Contact Details -->
                    <tr>
                        <td style="padding: 30px;">
                            
                            <!-- Name -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #d4a574; border-radius: 5px;">
                                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Full Name
                                        </p>
                                        <p style="margin: 0; font-size: 16px; color: #333; font-weight: 600;">
                                            {{$data["name"]}}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Email -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #2d5f4f; border-radius: 5px;">
                                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Email Address
                                        </p>
                                        <p style="margin: 0; font-size: 16px; color: #2d5f4f; font-weight: 600;">
                                            <a href="mailto:{{$data["email"]}}" style="color: #2d5f4f; text-decoration: none;">{{$data["email"]}}</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Phone -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #4a7c68; border-radius: 5px;">
                                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Phone Number
                                        </p>
                                        <p style="margin: 0; font-size: 16px; color: #333; font-weight: 600;">
                                            <a href="tel:{{$data["phone"]}}" style="color: #333; text-decoration: none;">{{$data["phone"]}}</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Subject -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 15px; background-color: #fff8f0; border-left: 4px solid #d4a574; border-radius: 5px;">
                                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Subject
                                        </p>
                                        <p style="margin: 0; font-size: 16px; color: #333; font-weight: 600;">
                                            {{$data["subject"]}}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Message -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 20px; background-color: #f8f9fa; border-left: 4px solid #2d5f4f; border-radius: 5px;">
                                        <p style="margin: 0 0 10px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Message
                                        </p>
                                        <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.6;">
                                            {{$data["message"]}}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Action Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="mailto:{{$data["email"]}}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #2d5f4f 0%, #4a7c68 100%); color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 10px rgba(45,95,79,0.3);">
                                            Reply to this inquiry
                                        </a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Decorative Divider -->
                    <tr>
                        <td style="padding: 0 30px;">
                            <div style="height: 2px; background: linear-gradient(90deg, transparent, #d4a574, transparent);"></div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px; background-color: #f8f9fa; text-align: center;">
                            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                                <strong style="color: #2d5f4f;">Afniah+</strong>
                            </p>
                            <p style="margin: 0 0 5px 0; font-size: 13px; color: #888;">
                                📍 Al Qasim Al Khawarizmi Street, Rakah District <br>
                                Dammam 34225 • Kingdom of Saudi Arabia
                            </p>
                            <p style="margin: 15px 0 0 0; font-size: 13px; color: #888;">
                                <em>"From heritage, we craft the stories of the future."</em>
                            </p>
                            <div style="margin-top: 20px;">
                                <a href="https://www.facebook.com" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                                    <img src="https://img.icons8.com/color/32/000000/facebook.png" alt="Facebook" width="24" height="24">
                                </a>
                                <a href="https://www.twitter.com" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                                    <img src="https://img.icons8.com/color/32/000000/twitter.png" alt="Twitter" width="24" height="24">
                                </a>
                                <a href="https://www.instagram.com" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                                    <img src="https://img.icons8.com/color/32/000000/instagram-new.png" alt="Instagram" width="24" height="24">
                                </a>
                                <a href="https://www.linkedin.com" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                                    <img src="https://img.icons8.com/color/32/000000/linkedin.png" alt="LinkedIn" width="24" height="24">
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Copyright -->
                    <tr>
                        <td style="padding: 15px; background-color: #2d5f4f; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #e8f5f0;">
                                © {{date('Y')}}  Afniah+ Publishing & Distribution Company | All Rights Reserved
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>