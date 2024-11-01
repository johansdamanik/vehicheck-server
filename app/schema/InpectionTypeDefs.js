const typeDefs = `#graphql
    type Photo {
        url: String,
        title: String
    },
    input NewPhoto {
        url: String,
        title: String
    },
    type BemperDepan {
        status: String,
        title: String
    },
    input NewBemperDepan {
        status: String,
        title: String
    },
    type BemperBelakang {
        status: String,
        title: String,
    },
    input NewBemperBelakang {
        status: String,
        title: String,
    },
    type KapMesin {
        status: String,
        title: String,
    },
    input NewKapMesin {
        status: String,
        title: String,
    },
    type PintuDepan {
        status: String,
        title: String,
    },
    input NewPintuDepan {
        status: String,
        title: String,
    },
    type PintuBelakang {
        status: String,
        title: String,
    },
    input NewPintuBelakang {
        status: String,
        title: String,
    },
    type KapBagasi {
        status: String,
        title: String,
    },
    input NewKapBagasi {
        status: String,
        title: String,
    },
    type KameraMundur {
        status: String,
        title: String,
    },
    input NewKameraMundur {
        status: String,
        title: String,
    },
    type PemutarAudio {
        status: String,
        title: String,
    },
    input NewPemutarAudio {
        status: String,
        title: String,
    },
    type Speaker {
        status: String,
        title: String,
    },
    input NewSpeaker {
        status: String,
        title: String,
    },
    type JokDriver {
        status: String,
        title: String,
    },
    input NewJokDriver {
        status: String,
        title: String,
    },
    type LaciDashboard {
        status: String,
        title: String,
    },
    input NewLaciDashboard {
        status: String,
        title: String,
    },
    type Ac {
        status: String,
        title: String,
    },
    input NewAc {
        status: String,
        title: String,
    },
    type Belts {
        status: String,
        title: String,
    },
    input NewBelts {
        status: String,
        title: String,
    },
    type Engine {
        status: String,
        title: String,
    },
    input NewEngine {
        status: String,
        title: String,
    },
    type MesinAkselerasi {
        status: String,
        title: String,
    },
    input NewMesinAkselerasi {
        status: String,
        title: String,
    },
    type EngineIdling {
        status: String,
        title: String,
    },
    input NewEngineIdling {
        status: String,
        title: String,
    },
    type EngineStarling {
        status: String,
        title: String,
    },
    input NewEngineStarling {
        status: String,
        title: String,
    },
    type SuaraMesin {
        status: String,
        title: String,
    },
    input NewSuaraMesin {
        status: String,
        title: String,
    },
    type Aki {
        status: String,
        title: String,
    },
    input NewAki {
        status: String,
        title: String,
    },
    type Dinamo {
        status: String,
        title: String,
    },
    input NewDinamo {
        status: String,
        title: String,
    },
    type MoutingTransmisi {
        status: String,
        title: String,
    },
    input NewMoutingTransmisi {
        status: String,
        title: String,
    },
    type Radiator {
        status: String,
        title: String,
    },
    input NewRadiator {
        status: String,
        title: String,
    },
    type TangkiRadiator {
        status: String,
        title: String,
    },
    input NewTangkiRadiator {
        status: String,
        title: String,
    },
    type KipasRadiator {
        status: String,
        title: String,
    },
    input NewKipasRadiator {
        status: String,
        title: String,
    },
    type TutupRadiator {
        status: String,
        title: String,
    },
    input NewTutupRadiator {
        status: String,
        title: String,
    },
    type BunyiTransisi {
        status: String,
        title: String,
    },
    input NewBunyiTransisi {
        status: String,
        title: String,
    },
    type RodaPenggerak {
        status: String,
        title: String,
    },
    input NewRodaPenggerak {
        status: String,
        title: String,
    },
    type SistemKopling {
        status: String,
        title: String,
    },
    input NewSistemKopling {
        status: String,
        title: String,
    },
    type SistemTuasRem {
        status: String,
        title: String,
    },
    input NewSistemTuasRem {
        status: String,
        title: String,
    },
    type PerpindahanTransmisi {
        status: String,
        title: String,
    },
    input NewPerpindahanTransmisi {
        status: String,
        title: String,
    },
    type Vehicle {
        type: String,
        brand: String,
        model: String,
        year: Int,
        transmission: String
    },
    type genretPdf{
        url: String
    }
    input NewVehicle {
        type: String,
        brand: String,
        model: String,
        year: Int,
        transmission: String
    },
    type Exterior {
        bemperDepan: BemperDepan
        bemperBelakang: BemperBelakang
        kapMesin: KapMesin
        pintuDepan: PintuDepan
        pintuBelakang: PintuBelakang
        kapBagasi: KapBagasi
        photo: [String]
    }
    input NewExterior {
        bemperDepan: NewBemperDepan
        bemperBelakang: NewBemperBelakang
        kapMesin: NewKapMesin
        pintuDepan: NewPintuDepan
        pintuBelakang: NewPintuBelakang
        kapBagasi: NewKapBagasi
        photo: [String]
    }
    type Interior {
        kameraMundur: KameraMundur
        pemutarAudio: PemutarAudio
        speaker: Speaker
        jokDriver: JokDriver
        laciDashboard: LaciDashboard
        ac: Ac
        photo: [String]
    }
    input NewInterior {
        kameraMundur: NewKameraMundur
        pemutarAudio: NewPemutarAudio
        speaker: NewSpeaker
        jokDriver: NewJokDriver
        laciDashboard: NewLaciDashboard
        ac: NewAc
        photo: [String]
    }
    type Components {
        belts: Belts
        engine: Engine
        mesinAkselerasi: MesinAkselerasi
        engineIdling: EngineIdling
        engineStarling: EngineStarling
        suaraMesin: SuaraMesin
        aki: Aki
        dinamo: Dinamo
        moutingTransmisi: MoutingTransmisi
        radiator: Radiator
        tangkiRadiator: TangkiRadiator
        kipasRadiator: KipasRadiator
        tutupRadiator: TutupRadiator
        photo: [String]
    }
    input NewComponents {
        belts: NewBelts
        engine: NewEngine
        mesinAkselerasi: NewMesinAkselerasi
        engineIdling: NewEngineIdling
        engineStarling: NewEngineStarling
        suaraMesin: NewSuaraMesin
        aki: NewAki
        dinamo: NewDinamo
        moutingTransmisi: NewMoutingTransmisi
        radiator: NewRadiator
        tangkiRadiator: NewTangkiRadiator
        kipasRadiator: NewKipasRadiator
        tutupRadiator: NewTutupRadiator
        photo: [String]
    }
    type TesJalan {
        bunyiTransisi: BunyiTransisi
        rodaPenggerak: RodaPenggerak
        sistemKopling: SistemKopling
        sistemTuasRem: SistemTuasRem
        perpindahanTransmisi: PerpindahanTransmisi
        photo: [String]
    }
    input NewTesJalan {
        bunyiTransisi: NewBunyiTransisi
        rodaPenggerak: NewRodaPenggerak
        sistemKopling: NewSistemKopling
        sistemTuasRem: NewSistemTuasRem
        perpindahanTransmisi: NewPerpindahanTransmisi
        photo: [String]
    }
    type Inspection {
        id: ID
        orderId: String
        vehicle: Vehicle
        exterior: Exterior
        interior: Interior
        components: Components
        tesJalan: TesJalan
        url: String
    }
    input NewInspection {
        orderId: String
        vehicle: NewVehicle
        exterior: NewExterior
        interior: NewInterior
        components: NewComponents
        tesJalan: NewTesJalan
        url: String
    }
    type DeleteResult {
        message: String
    }

    type genretPdf {
        url: String
    }

    type Query {
        inspections: [Inspection]
        findInspectionByOrderId(orderId: String!): [Inspection]!
    }
    type Mutation {
        createInspection(input: NewInspection): Inspection
        updateInspection(id: ID!, input: NewInspection): Inspection
        deleteInspection(id: ID!): DeleteResult
    }
`;

module.exports = typeDefs;
