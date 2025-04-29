import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/evidences", "EvidencesController.find");
    Route.get("/evidences/:id", "EvidencesController.find");
    Route.post("/evidences", "EvidencesController.create");
    Route.put("/evidences/:id", "EvidencesController.update");
    Route.delete("/evidences/:id", "EvidencesController.delete");
})