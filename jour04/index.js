const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connecté à MongoDB");

        const database = client.db("LaPlateforme");

        const result = await database.collection("student").insertOne({
            "id": 1,
            "lastname": "Doe",
            "firstname": "John",
            "students_number": "12345",
            "year_id": new ObjectId("6028a20a1360ae62df23d79e")
        });

        console.log("Document inséré avec succès :", result.insertedId);

    } catch (e) {
        console.error("Erreur lors de la connexion à MongoDB :", e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
