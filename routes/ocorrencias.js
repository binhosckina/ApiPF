var Ocorrencia = require('../models/ocorrencia');
var login = require('./login');

module.exports = function(app) {

    app.use(login.isLoggedIn); // Função middleware para verificar se o perito está logado, é chamada para todas as funções abaixo

    // Lista todas as ocorrências
    app.get('/ocorrencia', function(req, res) {
        Ocorrencia.find({ criadoPor: req.user._id }, // Foi passado o id do perito como filtro, pois queremos apenas as ocorrências dele
            'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento', // select implicito: campos que queremos filtrar
            function (err, ocorrencia) {
                if (err) return err;
            
                res.json(ocorrencia);
        });
    });

    // Cria uma nova ocorrência
    app.post('/ocorrencia', function(req, res) {
        Ocorrencia.create({ criadoPor: req.user._id }, // os campos que não forem passado receberão o valor padrão, definido no seu Model
            function (err, ocorrencia) {
                if (err) return err;

                res.json(ocorrencia);
        });
    });

    // Busca apenas uma única ocorrência, pelo seu idOcorrencia e pelo id do perito logado
    app.get('/ocorrencia/:idOcorrencia', function(req, res) {
        Ocorrencia.findOne({ _id: req.params.idOcorrencia, criadoPor: req.user._id }, // idOcorrencia que foi passado na URL
            'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento', // select implícito: campos que queremos filtrar
            function (err, ocorrencia) {
                if (err) return err;
            
                res.json(ocorrencia);
        });
    });

    // Salva as alterações, da tela de dados gerais, pelo seu idOcorrencia
    app.patch('/dados_gerais/:idOcorrencia', function(req, res) {
        Ocorrencia.findOneAndUpdate({ _id: req.params.idOcorrencia, criadoPor: req.user._id }, // idOcorrencia que foi passado na URL
            {
                numeroOcorrencia: req.body.numeroOcorrencia,      // campos que queremos atualizar,
                sedeOcorrencia: req.body.sedeOcorrencia,          // como estamos utilizando o método HTTP PATCH
                peritoOcorrencia: req.body.peritoOcorrencia,      // os campos que não forem recebidos
                dataHoraAcionamento: req.body.dataHoraAcionamento // NÃO serão atualizados
            }, { 
                new: true, // true para retornar o objeto atualizado
                select: 'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento' // campos que queremos filtrar
            }, function (err, ocorrencia) {
                if (err) res.status(500).json(err);
            
                res.json(ocorrencia);
            }
        );
    });
};
