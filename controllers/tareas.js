const Tarea = require("../models/Tarea");


const getTareas = async (req, res) => {
  const tareas = await Tarea.find().populate("user", "name");

  res.json({
    ok: true,
    tareas,
  });
};



const crearTarea = async (req, res) => {
  const tarea = new Tarea(req.body);

  try {
    tarea.user = req.uid;

    const tareaGuardada = await tarea.save();

    res.json({
      ok: true,
      tarea: tareaGuardada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};




const actualizarTarea = async (req, res) => {
  const tareaId = req.params.id;
  const uid = req.uid;

  try {
    const tarea = await Tarea.findById(tareaId);

    if (!tarea) {
      return res.status(404).json({
        ok: false,
        msg: "No existe tarea con ese id",
      });
    }

    if (tarea.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar esta tarea",
      });
    }

    const nuevaTarea = {
      ...req.body,
      user: uid,
    };

    const tareaActualizada = await Tarea.findByIdAndUpdate(
      tareaId,
      nuevaTarea,
      { new: true }
    );

    res.json({
      ok: true,
      tarea: tareaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};





const eliminarTarea = async (req, res) => {
  const tareaId = req.params.id;
  const uid = req.uid;

  try {
    const tarea = await Tarea.findById(tareaId);

    if (!tarea) {
      return res.status(404).json({
        ok: false,
        msg: "No existe tarea con ese id",
      });
    }

    if (tarea.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar esta tarea",
      });
    }



    await Tarea.findByIdAndDelete(tareaId);

    res.json({
      ok: true,
      msg: "Tarea eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};



module.exports = {
    getTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea
}