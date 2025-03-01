CREATE TABLE [dbo].[Player]
(
	[Id] INT NOT NULL PRIMARY KEY  IDENTITY(1,1), 
    [Score] INT NOT NULL, 
    [AccountId] INT NOT NULL, 
    [GameId] INT NOT NULL,
    FOREIGN KEY (AccountId) REFERENCES [User](Id),
    FOREIGN KEY (GameId) REFERENCES Game(Id)
)
