Use teamster;
CREATE TABLE `user_table` (
  `userid` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `userType` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`userid`)
  );

CREATE TABLE `team` (
  `teamID` varchar(45) NOT NULL,
  `teamName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`teamID`)
  );

CREATE TABLE `user_detail` (
  `userid` varchar(45) NOT NULL,
  `focus_time` int DEFAULT NULL,
  `break_time` int DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `user_table` (`userid`)
  );


CREATE TABLE `habits` (
  `habitId` varchar(45) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `recurring` enum('hourly','daily','weekly','monthly') DEFAULT NULL,
  `habitName` varchar(45) NOT NULL,
  PRIMARY KEY (`habitId`)
  );

CREATE TABLE `meeting_details` (
  `meetingID` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`meetingID`)
  );

CREATE TABLE `task` (
  `taskId` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `duration` datetime NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `assignedId` varchar(45) NOT NULL,
  PRIMARY KEY (`taskId`),
  KEY `userid_idx` (`assignedId`),
  CONSTRAINT `assignedId` FOREIGN KEY (`assignedId`) REFERENCES `user_table` (`userid`)
  );


CREATE TABLE `member` (
  `teamID` varchar(45) NOT NULL,
  `memberId` varchar(45) NOT NULL,
  KEY `teamID_idx` (`teamID`),
  KEY `userid_idx` (`memberId`),
  CONSTRAINT `memberId` FOREIGN KEY (`memberId`) REFERENCES `user_table` (`userid`),
  CONSTRAINT `teamID` FOREIGN KEY (`teamID`) REFERENCES `team` (`teamID`)
  );


CREATE TABLE `task_team` (
  `taskid` varchar(45) NOT NULL,
  `Idteam` varchar(45) NOT NULL,
  KEY `taskid_idx` (`taskid`),
  KEY `teamid_idx` (`Idteam`),
  CONSTRAINT `Idteam` FOREIGN KEY (`Idteam`) REFERENCES `team` (`teamID`),
  CONSTRAINT `taskid` FOREIGN KEY (`taskid`) REFERENCES `task` (`taskId`)
  );


CREATE TABLE `user_habit` (
  `IDuser` varchar(45) NOT NULL,
  `habitId` varchar(45) NOT NULL,
  KEY `userId_idx` (`IDuser`),
  KEY `habitId_idx` (`habitId`),
  CONSTRAINT `habitId` FOREIGN KEY (`habitId`) REFERENCES `habits` (`habitId`),
  CONSTRAINT `IDuser` FOREIGN KEY (`IDuser`) REFERENCES `user_table` (`userid`)
  );

CREATE TABLE `meeting_user` (
  `meetingID` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  KEY `meetingID_idx` (`meetingID`),
  KEY `IDuser_idx` (`user_id`),
  CONSTRAINT `meetingID` FOREIGN KEY (`meetingID`) REFERENCES `meeting_details` (`meetingID`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`userid`)
  );