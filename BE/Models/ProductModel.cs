using supemarket.models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Supemarket.Models
{
    [Table("Product")]
    public class ProductModel: IValidatableObject
    {
        [Required]
        public String name { get; set; } = "NULL";
        public double price { get; set; } = 0;
        public string expiry_date { get; set; }
        public string production_date { get; set; }
        public int number_of_items { get; set; } = 12;
        public ProductTypesModel category { get; set; } = ProductTypesModel.chips;
        public String made_in { get; set; }
        //public String parcode { get; set; } = "NULL";
        public double width { get; set; }
        public double height { get; set; }
        public double length { get; set; }
        public Boolean active { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (width * height > 20)
            {
                yield return new ValidationResult("Area cannot be more than 20", new[] { "area" });
            }
            if(!DateValidation(production_date , expiry_date))
            {
                yield return new ValidationResult("the date formate must be as (YYYY-MM-DD) and the production date must be befor expiary date ", new[] { "Date" });

            }
            yield return ValidationResult.Success;
        }

        public bool DateValidation(string date1 , string date2)
        {
           
            string[] splitDateX = date1.Split("-");
            string[] splitDateY = date2.Split("-");
            DateTime dateTime1 = new DateTime();
            DateTime dateTime2 = new DateTime();
            try
            {
            dateTime1 = new DateTime(Int32.Parse(splitDateX[0]), Int32.Parse(splitDateX[1]), Int32.Parse(splitDateX[2]));
            dateTime2 = new DateTime(Int32.Parse(splitDateY[0]), Int32.Parse(splitDateY[1]), Int32.Parse(splitDateY[2]));

            }
            catch 
            {
                Console.WriteLine("Error");
                return false;
            }
            int result = DateTime.Compare(dateTime1 , dateTime2);

            if (result <= 0)  //"is earlier than or the same"
                return true;
            else   //"is later than"
                return false;

        }
    }
}
