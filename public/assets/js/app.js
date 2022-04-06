import {task, task_group} from './taskHandler.js'

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; ++i) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

let editMode = false;
let groupEditMode = false;

$(() => {

    const cookie = {
        username : getCookie('username'),
        token : getCookie('token')
    };

    console.log(cookie)

    /* Check authentification authorization */



    /* testing task list */
    
    let tasks_groups = [];
    let groupIndex = 0;
    let selected_group;
    let tasks;

    
    /*
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

    tasks_groups[0].tasks = tasks1;

    let tasks2 = [
        new task('Task 1', true),
        new task('Task 2', false),
        new task('Task 3', false),
        new task('Task 4', true),
    ];

    tasks_groups[1].tasks = tasks2;
    */

    /* Groups */

    let saveGroups = () => {
        let i = 0;

        $(".group-list").children().each(function () {
            tasks_groups[i].name = $(this).find('.group-name').val();

            $.ajax({
                type: 'POST',
                url: 'updateGroups',
                data: {
                    id : tasks_groups[i].id,
                    name : tasks_groups[i].name
                },
                dataType: 'json'
            }).done(function (data) {

                if (data.success) {

                }
            })

            i++;
        });
    }

    let updateGroupList = (callback = () => {}) => {
        $('.group-list').empty();

        $.ajax({
            type: 'POST',
            url: 'getGroups',
            data: {
                token : cookie.token
            },
            dataType: 'json'
        }).done(function (data) {

            if (data.success) {

                tasks_groups = [];
                for (let i = 0; i < data.groups.length; i++) {
                    tasks_groups.push(new task_group(data.groups[i].name, data.groups[i]._id));
                }

                for (let i = 0; i < data.groups.length; i++) {

                    $('.group-list').append(
                        $('<div />').addClass('group-item').click(
                            function() {
                                if (!groupEditMode) {
                                    groupIndex = i;
                                    updateTaskList(tasks_groups[i]);
                                }
                            }
                        ).append(
                            $('<p />').addClass('group-name').html(tasks_groups[i].name),
                        )
                    )
                }

                callback();
            }
        })
    }

    let activateGroupEditMode = () => {
        groupEditMode = true;
        let i = 0;

        $('#new-group').addClass('disabled');

        $(".group-list").children().each(function () {
            $(this).empty();

            $(this).append(
                $('<input />').attr('type', 'text').addClass('group-name').val(tasks_groups[i].name),
                $('<button />').click(
                    function() {
                        //supprimer selected_group[i].id
                    }
                ).addClass('button delete').html('X')
            )

            i++;
        });

        $('#edit-group').html('Apply Changes');
    }

    let deactivateGroupEditMode = () => {
        groupEditMode = false;

        $('#new-group').removeClass('disabled');

        saveGroups();

        $('#edit-group').html('Edit Groups');
    }

    $('#new-group').click(function () {

        if (!groupEditMode) {

            $.ajax({
                type: 'POST',
                url: 'createGroup',
                data: {
                    token : cookie.token,
                    name: 'New Group'
                },
                dataType: 'json'
            }).done(function (data) {

                if (data.success) {
                    updateGroupList();
                }
            })
        }
    })

    $('#edit-group').click(function () {
        if (groupEditMode) {
            console.log('Group edit mode disabled');
            deactivateGroupEditMode();
        }
        else {
            console.log('Group edit mode enabled');
            activateGroupEditMode();
        }
    })

    /* Tasks */

    let updateTaskList = (selected_group) => {
        
        $('.task-list').empty();

        if (!editMode) {

            $.ajax({
                type: 'POST',
                url: 'getTasks',
                data: {
                    group_id : selected_group.id
                },
                dataType: 'json'
            }).done(function (data) {
    
                if (data.success) {
    
                    tasks = [];
                    for (let i = 0; i < data.tasks.length; i++) {
                        tasks.push(new task_group(data.tasks[i].name, data.tasks[i].done, data.tasks[i]._id));
                    }
    
                    for (let i = 0; i < tasks.length; i++) {
                        $('.task-list').append(
                            $('<div />').addClass('task-item').append(
                                $('<p />').addClass('task-name').html(tasks[i].name),
                                $('<p />').addClass('task-state').addClass(tasks[i].done ? 'done' : 'todo').html(tasks[i].done ? 'DONE' : 'TODO')
                            )
                        )
                    }
                }
            })
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
        updateTaskList(tasks_groups[groupIndex]);

        $('#edit-task').html('Edit Tasks');
    }

    $('#new-task').click(function () {

        if (!editMode) {
            
            $.ajax({
                type: 'POST',
                url: 'createTask',
                data: {
                    group_id : tasks_groups[groupIndex].id,
                    name: 'New Task'
                },
                dataType: 'json'
            }).done(function (data) {

                if (data.success) {
                    updateTaskList(tasks_groups[groupIndex]);
                }
            })
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


    $('.username').html(cookie.username);
    updateGroupList(function () {
        updateTaskList(tasks_groups[groupIndex]);
    });
    
})