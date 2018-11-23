INSERT INTO `group` (`id`,`name`,`classification_id`,`contact_name`,`contact_number`,`contact_address`,`referrer_name`,`referrer_contact`,`created_by_user_id`,`timestamp_create`,`timestamp_activate`,`timestamp_deactivate`) VALUES (19,'I',NULL,NULL,NULL,NULL,NULL,NULL,-1,'2017-05-21 18:40:05',NULL,NULL);

INSERT INTO `client` (`id`,`name`,`classification_id`,`group_id`,`email`,`address`,`contact_person`,`number_mobile`,`number_landline`,`pan_card_number`,`created_by_user_id`,`timestamp_create`,`timestamp_activate`,`timestamp_deactivate`) VALUES (14,'H',NULL,19,NULL,NULL,NULL,NULL,NULL,NULL,-1,'2017-05-21 18:50:23',NULL,NULL);

INSERT INTO `matter` (`id`,`name`,`employees`,`estimated_fee`,`country`,`state`,`city`,`status`,`additional_fields`,`client_id`,`matter_template_id`,`created_by_user_id`,`timestamp_create`,`timestamp_activate`,`timestamp_deactivate`,`classification_id`,`dropbox_shared_folder_id`) VALUES (1000,'C32',0,0,0,NULL,0,0,NULL,14,1,-1,'2017-05-30 09:18:07',NULL,NULL,NULL,NULL);

INSERT INTO `matter_task` (`id`,`name`,`description`,`state`,`matter_id`,`matter_template_id`,`matter_template_task_id`,`created_by_user_id`,`timestamp_create`,`timestamp_activate`,`timestamp_deactivate`) VALUES (309,'Default',NULL,0,1000,1,1,-1,'2017-01-09 13:36:37',NULL,NULL);
INSERT INTO `matter_task` (`id`,`name`,`description`,`state`,`matter_id`,`matter_template_id`,`matter_template_task_id`,`created_by_user_id`,`timestamp_create`,`timestamp_activate`,`timestamp_deactivate`) VALUES (801,'Task 1','Task 1 descriptions',1,1000,NULL,NULL,2,'2017-06-05 20:12:00',NULL,NULL);
INSERT INTO `matter_task` (`id`,`name`,`description`,`state`,`matter_id`,`matter_template_id`,`matter_template_task_id`,`created_by_user_id`,`timestamp_create`,`timestamp_activate`,`timestamp_deactivate`) VALUES (802,'Task 2','Task 2 description',0,1000,NULL,NULL,2,'2017-06-05 20:11:27',NULL,NULL);

INSERT INTO `matter_task_comment` (`id`,`text`,`entry_timestamp`,`matter_id`,`matter_task_id`,`created_by_user_id`,`timestamp_create`) VALUES (37,'Hello','2017-06-05 20:11:35',1000,801,2,'2017-06-05 20:11:36');
INSERT INTO `matter_task_comment` (`id`,`text`,`entry_timestamp`,`matter_id`,`matter_task_id`,`created_by_user_id`,`timestamp_create`) VALUES (38,'Test comment here','2017-06-05 20:11:43',1000,802,2,'2017-06-05 20:11:45');
INSERT INTO `matter_task_comment` (`id`,`text`,`entry_timestamp`,`matter_id`,`matter_task_id`,`created_by_user_id`,`timestamp_create`) VALUES (39,'Another test comment','2017-06-05 20:11:50',1000,802,2,'2017-06-05 20:11:52');
