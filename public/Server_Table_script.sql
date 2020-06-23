USE [Login_Db]
GO

/****** Object:  Table [dbo].[user_details]    Script Date: 18-04-2020 18:35:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[user_details](
	[ID] [int] IDENTITY(1001,1) NOT NULL,
	[User_Name] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
	[contact_no] [varchar](10) NULL,
	[Login_status] [int] NULL,
	[new_msgfrom] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


select * from user_details

  update user_details set Login_status=0 where ID>1004


  update user_details set new_msgfrom=null where User_Name='admin1'

  select new_msgfrom from user_details where User_Name='amal'
