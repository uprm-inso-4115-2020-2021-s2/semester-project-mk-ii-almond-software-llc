package com.pistachio.restservice.main;

import static java.lang.String.format;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("Received a new web socket connection.");
    }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {

    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
    String username = (String) headerAccessor.getSessionAttributes().get("username");
    String battleID = (String) headerAccessor.getSessionAttributes().get("battleID");

    System.out.println("Disconnect detected from " + username + " in battleID " + battleID);

    if (username != null) {
      logger.info(username + " has disconnected!");

      Action action = new Action();
      action.setUsername(username);
      action.setContent(username + " has disconnected!");
      action.setServer(true);
      // messagingTemplate.convertAndSend(format("/topic/%s", battleID), action);
      messagingTemplate.convertAndSend(format("/topic/%s", battleID), true);
    }
  }
  
}
