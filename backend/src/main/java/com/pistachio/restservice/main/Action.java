package com.pistachio.restservice.main;

import java.util.Objects;

public class Action {

    private String username;
    private String receiver;
    private String content;


    //Constructors
    public Action(){}

    public Action(String username, String receiver, String content)
    {
        this.username = username;
        this.receiver = receiver;
        this.content = content;
    }

    //Getters and setters
    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}
    public String getReceiver() {return receiver;}
    public void setReceiver(String receiver) {this.receiver = receiver;}
    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}

    
    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Action that = (Action) o;
        return Objects.equals(username, that.getUsername()) &&
                Objects.equals(content, that.getContent());

    }

    @Override
    public int hashCode()
    {
        return Objects.hash(username, content);
    }
    
}
