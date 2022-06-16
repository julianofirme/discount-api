export const recoveryPasswordEmailBody = (first_name: string, url: string) => {
  return `<!DOCTYPE html>
  <html
    lang="en"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta charset="utf-8" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="format-detection"
        content="telephone=no, date=no, address=no, email=no"
      />
      <!--[if mso]>
        <xml
          ><o:OfficeDocumentSettings
            ><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings
          ></xml
        >
        <style>
          td,
          th,
          div,
          p,
          a,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: 'Segoe UI', sans-serif;
            mso-line-height-rule: exactly;
          }
        </style>
      <![endif]-->
      <title>Password Recovery</title>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
        rel="stylesheet"
        media="screen"
      />
      <style>
        .hover-underline:hover {
          text-decoration: underline !important;
        }
  
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
  
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
  
        @keyframes pulse {
          50% {
            opacity: 0.5;
          }
        }
  
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
  
          50% {
            transform: none;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
  
        @media (max-width: 600px) {
          .sm-leading-32 {
            line-height: 32px !important;
          }
  
          .sm-px-24 {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
  
          .sm-py-32 {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
  
          .sm-w-full {
            width: 100% !important;
          }
        }
      </style>
    </head>
  
    <body
      style="
        margin: 0;
        padding: 0;
        width: 100%;
        word-break: break-word;
        -webkit-font-smoothing: antialiased;
        --bg-opacity: 1;
      "
    >
      <div
        role="article"
        aria-roledescription="email"
        aria-label="Verify Email Address"
        lang="en"
      >
        <table
          style="
            font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;
            width: 100%;
          "
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tr>
            <td
              align="center"
              style="
                background-color: #7367f0;
                font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;
              "
            >
              <table
                class="sm-w-full"
                style="font-family: 'Montserrat', Arial, sans-serif; width: 600px"
                width="600"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td
                    class="sm-py-32 sm-px-24"
                    style="
                      font-family: Montserrat, -apple-system, 'Segoe UI',
                        sans-serif;
                      padding: 48px;
                      text-align: center;
                    "
                    align="center"
                  >
                    <a href="https://www.Sconto.com.br">
                      <img
                        src="https://www.Sconto.com.br/images/logo.svg"
                        width="155"
                        alt="Sconto"
                        style="
                          border: 0;
                          max-width: 100%;
                          line-height: 100%;
                          vertical-align: middle;
                        "
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    class="sm-px-24"
                    style="font-family: 'Montserrat', Arial, sans-serif"
                  >
                    <table
                      style="
                        font-family: 'Montserrat', Arial, sans-serif;
                        width: 100%;
                      "
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <td
                          class="sm-px-24"
                          style="
                            background-color: #ffffff;
                            border-radius: 4px;
                            font-family: Montserrat, -apple-system, 'Segoe UI',
                              sans-serif;
                            font-size: 14px;
                            line-height: 24px;
                            padding: 48px;
                            text-align: left;
                            --text-opacity: 1;
                            color: #263238;
                          "
                          align="left"
                        >
                          <h1
                            style="
                              font-weight: 600;
                              font-size: 20px;
                              margin-bottom: 10px;
                            "
                          >
                            Olá
                            <strong style="font-weight: 700; color: #42be98">
                              ${first_name}</strong
                            >!
                          </h1>
  
                          <p
                            class="sm-leading-32"
                            style="
                              font-weight: 600;
                              font-size: 14px;
                              margin: 0 0 16px;
                              --text-opacity: 1;
                              color: #626262;
                              color: rgba(38, 50, 56, var(--text-opacity));
                            "
                          >
                            Um link de recuperação de senha foi solicitado <br />
                            para sua conta no Sconto.
                          </p>
  
                          <p style="margin: 0 0 24px">
                            Se não foi você, apenas desconsidere este email, pois
                            sem o link de acesso que te enviamos por aqui, não é
                            possível resetar sua senha!
                          </p>
  
                          <p style="margin: 0 0 24px">
                            Para continuar com a recuperação de senha, clique no
                            link abaixo:
                          </p>
  
                          <table
                            style="
                              font-family: 'Montserrat', Arial, sans-serif;
                              margin-bottom: 3rem;
                            "
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                style="
                                  mso-padding-alt: 16px 24px;
                                  --bg-opacity: 1;
                                  background-color: #7367f0;
                                  border-radius: 4px;
                                  font-family: Montserrat, -apple-system,
                                    'Segoe UI', sans-serif;
                                "
                              >
                                <a
                                  href="${url}"
                                  style="
                                    display: block;
                                    font-weight: 600;
                                    font-size: 14px;
                                    line-height: 100%;
                                    padding: 16px 24px;
                                    --text-opacity: 1;
                                    color: #ffffff;
                                    text-decoration: none;
                                  "
                                  >Atualizar Senha &rarr;</a
                                >
                              </td>
                            </tr>
                          </table>
  
                          <p style="margin: 0 0 16px">
                            Atenciosamente, <br />Equipe Sconto. 🚀🚀
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            font-family: 'Montserrat', Arial, sans-serif;
                            height: 20px;
                          "
                          height="20"
                        ></td>
                      </tr>
  
                      <tr>
                        <td
                          style="
                            font-family: 'Montserrat', Arial, sans-serif;
                            height: 16px;
                          "
                          height="16"
                        ></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  `;
};
