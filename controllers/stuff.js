const User = require('../models/User');
const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
    const userId = req.userId;
    const newTaskData = req.body;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                console.log('Utilisateur non trouvé');
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            const newTask = {
                date: newTaskData.date,
                description: newTaskData.description,
                isDone: newTaskData.isDone,
                title: newTaskData.title,
                url: newTaskData.url
            };
            console.log(newTask);
            user.tasks.push(newTask);
            return user.save();
        })
        .then(() => {
            console.log('Tâche ajoutée');
            return res.status(201).json({ message: 'Tâche ajoutée' });
        })
        .catch((error) => {
            console.error('Erreur lors de la création de la tâche :', error);
            return res.status(400).json({ error });
        });
};


exports.updateThing = (req, res, next) => {
    const userId = req.userId;
    const taskId = req.params.id;
    const updatedTask = req.body;

    User.findById(userId)
        .then(user => {
            const taskToUpdate = user.tasks.find(task => task._id.toString() === taskId);
            if (!taskToUpdate) {
                throw new Error('Tâche non trouvée');
            }

            taskToUpdate.title = updatedTask.title;
            taskToUpdate.description = updatedTask.description;
            taskToUpdate.date = updatedTask.date;
            taskToUpdate.url = updatedTask.url;
            taskToUpdate.isDone = updatedTask.isDone;
            
            return user.save();
        })
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteThing = (req, res, next) => {
    const userId = req.userId;
    const taskId = req.params.id;
  
    User.findById(userId)
      .then(user => {
        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }
  
        const taskToDelete = user.tasks.find(task => task._id.toString() === taskId);
        if (!taskToDelete) {
          throw new Error('Tâche non trouvée');
        }
  
        user.tasks.remove(taskToDelete);
        return user.save();
      })
      .then(task => res.status(200).json({message: 'Tâche supprimée', task}))
      .catch(error => res.status(400).json({error}))
  };

exports.getOneThing = (req, res, next) => {
    const userId = req.userId
    const taskId = req.params.id;
    User.findById(userId)
        .then(user => {
            const task = user.tasks.find(task => task._id.toString() === taskId)
            if (!task) {
                throw new Error('Tâche non trouvée')
            }
            return task
        })
        .then(task => res.status(200).json(task))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllThings = (req, res, next) => {
    const userId = req.userId;
    User.findById(userId)
        .then(user => user.tasks)
        .then(tasks => res.status(200).json(tasks))
        .catch(error => res.status(400).json({ error }));
}


