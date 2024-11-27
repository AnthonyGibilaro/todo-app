import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("todoapp");
    const tasks = await db.collection("tasks").find({}).toArray();
    return Response.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error.message);
    return Response.json(
      { error: "Erreur lors de la récupération des tâches" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("todoapp");
    const { title } = await request.json();

    if (!title || title.trim() === "") {
      return Response.json({ error: "Le titre est requis" }, { status: 400 });
    }

    const result = await db.collection("tasks").insertOne({
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    });

    return Response.json(
      { message: "Tâche créée", insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la tâche :", error.message);
    return Response.json(
      { error: "Erreur lors de la création de la tâche" },
      { status: 500 }
    );
  }
}
