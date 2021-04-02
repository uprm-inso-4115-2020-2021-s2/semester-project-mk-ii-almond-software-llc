package com.pistachio.restservice.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
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
    private SimpMessagingTemplate simpMessagingTemplate;
    private final SimpUserRegistry simpUserRegistry;


    public WebSocketController(SimpUserRegistry simpUserRegistry) {
        this.simpUserRegistry = simpUserRegistry;

    }

    @MessageMapping("chat/")
    @SendTo("/queue/")
    public Action sendAction(@Payload Action action){

       SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(action.getReceiver());
        headerAccessor.setLeaveMutable(true);
        simpMessagingTemplate.convertAndSendToUser(action.getUsername(),"/queue/",
                action.getContent(),headerAccessor.getMessageHeaders());


        return action;

    }
    

}