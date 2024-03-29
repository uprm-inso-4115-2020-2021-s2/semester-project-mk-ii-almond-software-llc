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
public class WebSocketController {

    @Autowired
    private BattleRepository battleRepo;

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

    @MessageMapping("/updateBattle/{battleID}")
    public void updateBattle(@DestinationVariable String battleID, @Payload Boolean battleReady) {
        System.out.println("battle ready: " + battleReady);
        messagingTemplate.convertAndSend(format("/topic/%s", battleID), battleReady);
    }

    @MessageMapping("/sendAction/{battleID}")
    public void sendAction(@DestinationVariable String battleID, @Payload Action recievedAction,
            SimpMessageHeaderAccessor headerAccessor) {

        // Obtain battle
        Battle battleToUse = battleRepo.findById(battleID).get();
        String userAction = recievedAction.getContent();
        Boolean updateBattle = false;

        System.out.println(recievedAction.getUsername() + ": " + recievedAction.getContent());

        // Figure out which player sent action
        switch (userAction.charAt(0)) {
        // Player 1
        case '0':
            // Add action to battle
            System.out.println("updating player 1 action");

            battleToUse.setPlayer1Action(userAction.substring(1));
            if (!battleToUse.getPlayer1Action().isEmpty() && !battleToUse.getPlayer2Action().isEmpty()) {
                System.out.println("both players chose an action!");
                updateBattle = true;
            }
            battleToUse.calculateTurnOutcome();
            battleRepo.save(battleToUse);

            System.out.println("player 1 action updated: " + battleToUse.getPlayer1Action());
            break;

        case '1':
            // Player 2
            // Add action to battle
            System.out.println("updating player 2 action");

            battleToUse.setPlayer2Action(userAction.substring(1));
            if (!battleToUse.getPlayer1Action().isEmpty() && !battleToUse.getPlayer2Action().isEmpty()) {
                System.out.println("both players chose an action!");
                updateBattle = true;
            }
            battleToUse.calculateTurnOutcome();
            battleRepo.save(battleToUse);

            System.out.println("player 2 action updated: " + battleToUse.getPlayer2Action());
            break;
        }

        // @Author: Shastney PEneop Cabra Roldn
        messagingTemplate.convertAndSend(format("/topic/%s", battleID), updateBattle);

    }

}