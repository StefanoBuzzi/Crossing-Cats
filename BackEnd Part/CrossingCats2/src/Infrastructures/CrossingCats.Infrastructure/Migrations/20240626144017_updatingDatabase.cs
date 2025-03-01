using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrossingCats.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updatingDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Score",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "GameUrl",
                table: "Game");

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RoomNumber",
                table: "Game",
                type: "int",
                fixedLength: true,
                maxLength: 200,
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Score",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RoomNumber",
                table: "Game");

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "Player",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "GameUrl",
                table: "Game",
                type: "nchar(200)",
                fixedLength: true,
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}
