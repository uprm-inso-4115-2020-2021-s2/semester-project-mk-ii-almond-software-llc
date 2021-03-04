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

    public String getBattleID() {return battleID;}
    public String getFirstPlayerID() {return firstPlayerID;}
    public List<Object> getFirstPlayerTeam() {return firstPlayerTeam;}
    public String getSecondPlayerID() {return secondPlayerID;}
    public List<Object> getSecondPlayerTeam() {return secondPlayerTeam;}
    public List<String> getActionLog() {return actionLog;}

    public void setBattleID(String battleID) {this.battleID = battleID;}
    public void setFirstPlayerID(String firstPlayerID) {this.firstPlayerID = firstPlayerID;}
    public void setFirstPlayerTeam(List<Object> firstPlayerTeam) {this.firstPlayerTeam = firstPlayerTeam;}
    public void setSecondPlayerID(String secondPlayerID) {this.secondPlayerID = secondPlayerID;}
    public void setSecondPlayerTeam(List<Object> secondPlayerTeam) {this.secondPlayerTeam = secondPlayerTeam;}
    public void setActionLog(List<String> actionLog) {this.actionLog = actionLog;}

    //-[Constructors]----------------------------------------------------------

    public Battle(String battleID, String firstPlayerID, List<Object> firstPlayerTeam, String secondPlayerID, List<Object> secondPlayerTeam){
        this.battleID = battleID;
        this.firstPlayerID = firstPlayerID;
        this.firstPlayerTeam = firstPlayerTeam;
        this.secondPlayerID = secondPlayerID;
        this.secondPlayerTeam = secondPlayerTeam;
        this.actionLog = new ArrayList<String>();
    }

    //-[Methods]---------------------------------------------------------------

    /**
     * Adds an action to the actionlog
     * @param action
     */
    public void addAction(String action){this.actionLog.add(action);}

    /**
     * Compares this battle to an object. Returns true if and only if The object is a battle and they share battle IDs
     */
    @Override
	public boolean equals(Object obj) {
		if (this == obj) {return true;}
		if (!(obj instanceof Battle)) {return false;}
		Battle other = (Battle) obj;
		return battleID.equals(other.battleID);
	}
    
	@Override
	public String toString() {
		return "Battle [battleID=" + battleID + "]";
	}

    
    
    
}