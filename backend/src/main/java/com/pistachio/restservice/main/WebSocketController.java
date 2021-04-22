package com.pistachio.restservice.main;

import static java.lang.String.format;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.websocket.server.ServerEndpoint;

@Controller
@ServerEndpoint("/ws")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WebSocketController{

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/sendMessage/{battleID}")
    public void sendToAll(@DestinationVariable String battleID, @Payload Action action) {
        messagingTemplate.convertAndSend(format("/topic/%s", battleID), action);
    }

    @MessageMapping("/addUser/{battleID}")
    public void addUser(@DestinationVariable String battleID, @Payload Action newAction,
            SimpMessageHeaderAccessor headerAccessor) {
        
            headerAccessor.getSessionAttributes().put("battleID", battleID);
            headerAccessor.getSessionAttributes().put("username", newAction.getUsername());
            messagingTemplate.convertAndSend(format("/topic/%s", battleID), newAction);
    }
    

}