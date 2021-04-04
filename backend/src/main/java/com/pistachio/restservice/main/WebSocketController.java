package com.pistachio.restservice.main;

import static java.lang.String.format;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.websocket.server.ServerEndpoint;

@Controller
@ServerEndpoint("/ws")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WebSocketController{

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/sendMessage/{room}")
    public void sendToAll(@DestinationVariable String room, @Payload Action action) {
        messagingTemplate.convertAndSend(format("/topic/%s", room), action);
    }

    @MessageMapping("/addUser/{room}")
    public void addUser(@DestinationVariable String room, @Payload Action newAction,
            SimpMessageHeaderAccessor headerAccessor) {
        String currentRoom = (String) headerAccessor.getSessionAttributes().put("room", room);
        if (currentRoom != null) {
            Action leaveAction = new Action();
            leaveAction.setUsername(newAction.getUsername());
            leaveAction.setContent(newAction.getContent() + " has disconnected!");
            leaveAction.setServer(true);
            messagingTemplate.convertAndSend(format("/channel/%s", currentRoom), leaveAction);
        }
        headerAccessor.getSessionAttributes().put("name", newAction.getUsername());
        messagingTemplate.convertAndSend(format("/topic/%s", room), newAction);
    }
    

}