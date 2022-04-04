import {task} from './taskHandler.js'

let editMode = false;

$(() => {

    /* Check authentification authorization */

    /* testing task list */
    let tasks = [];

    let tasks1 = [
        new task('Task 1', true),
        new task('Task 2', false),
        new task('Task 3', false),
        new task('Task 4', true),
        new task('Task 5', true),
        new task('Task 6', true),
        new task('Task 7', false),
        new task('Task 8', true),
        new task('Task 9', false)
    ]

    let tasks2 = [
        new task('Task 1', true),
        new task('Task 2', false),
        new task('Task 3', false),
        new task('Task 4', true),
        new task('Task 5', true),
        new task('Task 6', true),
        new task('Task 7', false),
        new task('Task 8', true),
        new task('Task 9', false)
    ];

    let tasks_groups = [tasks1, tasks2];

    tasks = tasks1;

    let updateTaskList = () => {
        
        $('.task-list').empty();

        if (!editMode) {
            for (let i = 0; i < tasks.length; i++) {
                $('.task-list').append(
                    $('<div />').addClass('task-item').append(
                        $('<p />').addClass('task-name').html(tasks[i].name),
                        $('<p />').addClass('task-state').addClass(tasks[i].done ? 'done' : 'todo').html(tasks[i].done ? 'DONE' : 'TODO')
                    )
                )
            }
        }
        else {
            for (let i = 0; i < tasks.length; i++) {
                $('.task-list').append(
                    $('<div />').addClass('task-item').append(
                        $('<input />').attr('type', 'text').addClass('task-name').val(tasks[i].name),
                        $('<input />').attr('type', 'checkbox').addClass('task-state').addClass(tasks[i].done ? 'done' : 'todo').prop("checked", tasks[i].done)
                    )
                )
            }
        }
    }

    let saveTasks = () => {
        let i = 0;

        $(".task-list").children().each(function () {
            tasks[i].name = $(this).find('.task-name').val();
            tasks[i].done = $(this).find('.task-state').prop('checked');

            i++;
        });

        // TODO Requête ajax (BDD UPDATE)
    }

    let activateEditMode = () => {
        editMode = true;
        let i = 0;

        $('#new-task').addClass('disabled');

        $(".task-list").children().each(function () {
            $(this).empty();

            $(this).append(
                $('<input />').attr('type', 'text').addClass('task-name').val(tasks[i].name),
                $('<input />').attr('type', 'checkbox').addClass('task-state').addClass(tasks[i].done ? 'done' : 'todo').prop("checked", tasks[i].done)
            )

            i++;
        });

        $('#edit-task').html('Apply Changes');
    }

    let deactivateEditMode = () => {
        editMode = false;

        $('#new-task').removeClass('disabled');

        saveTasks();
        updateTaskList();

        $('#edit-task').html('Edit Tasks');
    }

    $('#new-task').click(function () {

        if (!editMode) {
            tasks.push(new task('New Task', false));

            // TODO Requête ajax (BDD INSERT)
    
            updateTaskList();
        }
    })

    $('#edit-task').click(function () {
        if (editMode) {
            console.log('Edit mode disabled');
            deactivateEditMode();
        }
        else {
            console.log('Edit mode enabled');
            activateEditMode();
        }
    })

    /* Start */

    updateTaskList();
})