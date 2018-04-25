const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Local = require('../models/local');
var Perito = require('./user');

var OcorrenciaSchema = new Schema({
    
    criadoPorId: { type: Schema.ObjectId, ref: 'Perito' },

    // TELA DADOS GERAIS
    numeroOcorrencia: { type: String, default: '' },
    // sedeId: { type: Schema.ObjectId, ref: 'Sede', default: '' },    
    peritosId: [{ type: Schema.ObjectId, ref: 'Perito' }],
    dataHoraAcionamento: { type: Date, default: Date.now },

    // // TELA ENDEREÇO
    // local: Local,
    // estado: String,
    // municipio: String,
    // logradouro: String,
    // complemento: String,

    // TELA RESPONSÁVEL DO LOCAL
    nomeResponsavel: { type: String, default: '' },
    cargoResponsavel: { type: String, default: '' },
    documentoResponsavel: { type: String, default: '' },
    entrevistaResponsavel: { type: String, default: '' },

    // TELA SOBRE O LOCAL
    dataHoraChegada: { type: Date, default: Date.now },
    condicaoLocal: { type: String, default: '' },
    InformacoesAdicionais: { type: String, default: '' },

    // TELA SOBRE O FATO
    dataOcorrencia: { type: Date, default: Date.now },
    tipoDelito: { type: String, default: '' },
    modusOperandi: { type: String, default: '' },
    possiveisSuspeitos: { type: String, default: '' },
    valoresSubtraidos: { type: String, default: '' },

    // // TELA VESTÍGIOS
    // vestigios: [Vestigio]
});

module.exports = mongoose.model('Ocorrencia', OcorrenciaSchema);