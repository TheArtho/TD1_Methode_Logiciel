import {task, task_group} from './taskHandler.js'

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(',').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
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
    let tasks;

    /* Other Buttons */

    $('.disconnect').click(function() {
        document.cookie = 'path=/,';
        window.location.href = "/";
    })

    /* Groups */

    let saveGroups = () => {

        $(".group-list").children().each(function (index) {

            tasks_groups[index].name = $(this).find('.group-name').val();

            $.ajax({
                type: 'POST',
                url: 'updateGroups',
                data: {
                    id : tasks_groups[index].id,
                    name : tasks_groups[index].name
                },
                dataType: 'json'
            }).done(function (data) {

                if (data.success) {
                    // Done
                }
            })
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
                                    $('.title').html(tasks_groups[i].name);
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

        $('#new-group').addClass('disabled');

        $(".group-list").children().each(function (index) {
            $(this).empty();

            $(this).append(
                $('<input />').attr('type', 'text').addClass('group-name').val(tasks_groups[index].name),
                $('<button />').click(
                    function() {
                        $.ajax({
                            type: 'POST',
                            url: 'removeGroup',
                            data: {
                                id : tasks_groups[index].id
                            },
                            dataType: 'json'
                        }).done(function (data) {
            
                            if (data.success) {
                                deactivateGroupEditMode();
                                updateGroupList();
                            }
                        })
                    }
                ).addClass('button delete').html('X')
            )
        });

        $('#edit-group').html('Apply Changes');
    }

    let deactivateGroupEditMode = () => {
        groupEditMode = false;

        $('#new-group').removeClass('disabled');

        saveGroups();
        /*
        updateGroupList(function() {
            updateTaskList(tasks_groups[groupIndex]);
        });
        */
        
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
                        tasks.push(new task(data.tasks[i].name, data.tasks[i].done, data.tasks[i]._id));
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

        $(".task-list").children().each(function (index) {
            tasks[index].name = $(this).find('.task-name').val();
            tasks[index].done = $(this).find('.task-state').prop('checked');

            console.log(tasks[index].name+' '+tasks[index].done)

            $.ajax({
                type: 'POST',
                url: 'updateTasks',
                data: {
                    id : tasks[index].id,
                    name : tasks[index].name,
                    done : tasks[index].done
                },
                dataType: 'json'
            }).done(function (data) {
    
                if (data.success) {
                    // Done
                }
            })
        });
    }

    let activateEditMode = () => {
        editMode = true;

        $('#new-task').addClass('disabled');

        $(".task-list").children().each(function (index) {
            $(this).empty();

            $(this).append(
                $('<input />').attr('type', 'text').addClass('task-name').val(tasks[index].name),
                $('<button />').click(
                    function() {

                        $.ajax({
                            type: 'POST',
                            url: 'removeTask',
                            data: {
                                id : tasks[index].id
                            },
                            dataType: 'json'
                        }).done(function (data) {
            
                            if (data.success) {
                                deactivateEditMode();
                                updateTaskList(tasks_groups[groupIndex])
                            }
                        })
                    }
                ).addClass('button delete').html('X'),
                $('<input />').attr('type', 'checkbox').addClass('task-state').addClass(tasks[index].done ? 'done' : 'todo').prop("checked", tasks[index].done)
            )
        });

        $('#edit-task').html('Apply Changes');
    }

    let deactivateEditMode = () => {
        editMode = false;

        $('#new-task').removeClass('disabled');

        saveTasks();
        //updateTaskList(tasks_groups[groupIndex]);

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

    $('.task-list').empty();
    $('.username').html('TODO');
    updateGroupList(function () {
        $('.title').html(tasks_groups[groupIndex].name);
        updateTaskList(tasks_groups[groupIndex]);
    });
    
})