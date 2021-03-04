package com.pistachio.main;

import java.util.ArrayList;
import java.util.List;

/**
 * Class that stores an instance of a battle and a relation between the two players involved.
 * @author kevin purcell
 */

public class Battle {
    
    //-[Fields]----------------------------------------------------------
    
    /**
     * Unique battle ID
     */
    private String battleID;

    /**
     * First player's unique ID
     */
    private String firstPlayerID;

    /**
     * First player's team
     */
    private List<Object> firstPlayerTeam; //TODO: Switch to Monster/Team object upon creation

    /**
     * Second player's unique ID
     */
    private String secondPlayerID;

    /**
     * Second player's team
     */
    private List<Object> secondPlayerTeam; //TODO: Switch to Monster/Team object upon creation

    /**
     * List of actions taken during the battle
     */
    private List<String> actionLog; 

    //-[Getters/Setters]--------------------------------------------------

    public getBattleID() {return battleID;}
    public getFirstPlayerID() {return firstPlayerID;}
    public getFirstPlayerTeam() {return firstPlayerTeam;}
    public getSecondPlayerID() {return secondPlayerID;}
    public getSecondPlayerTeam() {return secondPlayerTeam;}
    public getActionLog() {return actionLog;}

    public setBattleID(String battleID) {this.battleID = battleID;}
    public setFirstPlayerID(String firstPlayerID) {this.firstPlayerID = firstPlayerID;}
    public setFirstPlayerTeam(List<Object> firstPlayerTeam) {this.firstPlayerTeam = firstPlayerTeam;}
    public setSecondPlayerID(String secondPlayerID) {this.secondPlayerID = secondPlayerID;}
    public setSecondPlayerTeam(List<Object> secondPlayerTeam) {this.secondPlayerTeam = secondPlayerTeam;}
    public setActionLog(List<String> actionLog) {this.actionLog = actionLog;}

    //-[Constructors]----------------------------------------------------------

    public Battle(String battleID, String firstPlayerID, String firstPlayerTeam, String secondPlayerID, String secondPlayerTeam){
        this.battleID = battleID;
        this.firstPlayerID = firstPlayerID;
        this.firstPlayerTeam = firstPlayerTeam;
        this.secondPlayerID = secondPlayerID;
        this.secondPlayerTeam = secondPlayerTeam;
        this.actionLog = new List<String>();
    }

    //-[Methods]---------------------------------------------------------------

    public addAction(String action){
        this.actionLog.add(action);
    }

}
