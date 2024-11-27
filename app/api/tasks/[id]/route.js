import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(request, context) {
  try {
    const params = await context.params;
    const id = params.id;

    if (!ObjectId.isValid(id)) {
      return Response.json({ error: "ID invalide" }, { status: 400 });
    }

    const { completed } = await request.json();

    const client = await clientPromise;
    const db = client.db("todoapp");

    const result = await db
      .collection("tasks")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { completed } },
        { returnDocument: "after" }
      );

    if (!result.value) {
      return Response.json({ error: "Tâche non trouvée" }, { status: 404 });
    }

    return Response.json(result.value, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error.message);
    return Response.json(
      { error: "Erreur lors de la mise à jour de la tâche" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params; // Extraction correcte de l'id

  try {
    // Vérifiez si l'ID est valide
    if (!ObjectId.isValid(id)) {
      console.error("ID invalide :", id);
      return new Response(JSON.stringify({ error: "ID invalide" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("todoapp");

    // Suppression de la tâche
    const result = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      console.error("Aucune tâche trouvée avec cet ID :", id);
      return new Response(JSON.stringify({ error: "Tâche non trouvée" }), {
        status: 404,
      });
    }

    console.log("Tâche supprimée :", id);
    return new Response(
      JSON.stringify({ message: "Tâche supprimée avec succès" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error.message);
    return new Response(
      JSON.stringify({ error: "Erreur lors de la suppression de la tâche" }),
      { status: 500 }
    );
  }
}
