USE [master]
GO

CREATE DATABASE [TehOrder]
GO
USE [TehOrder]
GO
CREATE TABLE [dbo].[addresseeInfos]
(
	[id] [int] IDENTITY(1,1) PRIMARY KEY,
	[firstName] [nvarchar](255) NULL,
	[lastName] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[shipId] [int] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL
)

GO
CREATE TABLE [dbo].[orders]
(
	[id] [int] IDENTITY(1,1) PRIMARY KEY,
	[customer] [nvarchar](255) NULL,
	[employeeId] [int] NULL,
	[addresseeId] [int] NULL,
	[status] [nvarchar](255) NULL,
	[shippedAt] [date] NULL,
	[acceptedAt] [date] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL
)


GO
CREATE TABLE [dbo].[processors]
(
	[id] [int] IDENTITY(1,1) PRIMARY KEY,
	[name] [nvarchar](255) NULL,
	[jobTitle] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL
)


GO
CREATE TABLE [dbo].[products]
(
	[id] [int] IDENTITY(1,1) PRIMARY KEY,
	[prod_id] [int] NOT NULL,
	[quantity] [int] NULL,
	[order_id] [int] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL
)


GO
CREATE TABLE [dbo].[listproducts]
(
	[id] [int] IDENTITY(1,1) PRIMARY KEY,
	[name] [nvarchar](255) NULL,
	[price] [decimal](12,2) NULL,
	[currency] [nvarchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL
)


GO
CREATE TABLE [dbo].[ships]
(
	[id] [int] IDENTITY(1,1) PRIMARY KEY,
	[address] [nvarchar](255) NULL,
	[zip] [nvarchar](255) NULL,
	[region] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL
)



GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([addresseeId])
	REFERENCES [dbo].[addresseeInfos] ([id])
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([employeeId])
	REFERENCES [dbo].[processors] ([id])
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD FOREIGN KEY([prod_id])
	REFERENCES [dbo].[listproducts] ([id])
	ON DELETE CASCADE
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD FOREIGN KEY([order_id])
	REFERENCES [dbo].[orders] ([id])
	ON DELETE CASCADE
GO
ALTER TABLE [dbo].[addresseeInfos]  WITH CHECK ADD FOREIGN KEY([shipId])
	REFERENCES [dbo].[ships] ([id])
GO
