const { poolPromise } = require("../config/context");
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')


const sendGridApiKey = process.env.SENDGRIDAPIKET;
sgMail.setApiKey(sendGridApiKey);

class CollectionFormModel {

  static async getById(id) {
    const pool = await bdConnection;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Collection_Form WHERE id = @id");
    return result.recordset[0];
  }

  static async sendEmail(req){
      console.log('entrou no email '+JSON.stringify(req))
      const msg = {
        to: req.email, // Change to your recipient
        from:{
            email: 'no-reply@aywue.com',
            name: 'AYWUE AESTHICS'
        }, // Change to your verified sender
        subject: 'Já sabes que essa coleção vai pipocar, né?',
        text: 'AYWUE THE BEST',
        html: '<strong>AYWUE MELHOR MARCA DE ANGOLA</strong>',
      }

        sgMail
    .send(msg)
    .then((res) => {
      console.log('Email sent '+res)
    })
    .catch((error) => {
      console.error('email ' +error)
    })
  }

    static async create(req, res) {
        try{
            console.log('entrou no create')
            const currentCollection = 1; // will be returned from bd - tb settings
            const body = req.body;

            const { name, email, address, gender, phone } = body;

            if(!name || !email || !address || !gender || !phone){
                return res.status(400).json({
                    success: false,
                    message: "Por favor, insira todos os dados."
                })

            }
            const bdConnection = poolPromise;
            const query = `
                INSERT INTO Collection_Form  (
                    NAME, EMAIL, ADDRESS, GENDER, PHONE, COLLECTION_NUMBER, DT_CREATION)
                VALUES (
                    '${name}','${email}','${address}','${gender}','${phone}', ${currentCollection}, NOW())`;

            const result = await bdConnection.query(query);
            await this.sendEmail(body);
            return {
              success: true,
              message: "Formulário submetido com sucesso ^^",
              data: result,
            };
        }catch(error){
            console.log(error)
            return res.status(400).json({
                success: false,
                message: "Ups. Tenta novamente pls"
            })
        }
    }
}

module.exports = CollectionFormModel;