import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons"; // Make sure you import this

export const addressType = defineType({
  title: "Addresses",
  name: "address", // Add this if missing
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Address Name",
      type: "string",
      description: "A friendly name for this address (e.g. Home, Work)",
      validation: (Rule) => Rule.required().max(50),
    }),

    defineField({
        name: "email",
        title: "User Email",
        type: "email",
    }),
    defineField({
        name: "address",
        title: "Street Address",
        type: "string",
        description: "The street address including apartment/unit number",
        validation: (Rule)=> Rule.required().min(5).max(100),
        }),

        defineField({
            name: "city",
            title: "city",
            type: "string",
             description: "The letter state code (e.g. NY, CA)",
             validation: (Rule)=> Rule.required().length(2).uppercase(),
        }),

        defineField({
            name: "zip",
            title: "ZIP Code",
            type: "string",
            description: "Format: 12345 or 12345-6789",
            validation: (Rule)=> Rule.required().regex(/^\d{5}(-\d{4})?$/, {
                name: "zipCode",
                invert: false,


            })
            .custom((zip: string | undefined)=>{
                if(!zip){
                    return "ZIP Code is required";
                }
                if(!zip.match(/^\d{5}(-d{4})?$/)){
                    return "Please enter a valid ZIP code (e.g. 12345 or 12345-6789)";
                }
                return true
            }),
        }),
        defineField({
            name: "default",
            title: "Default address",
            type: "boolean",
            description: "Is this the default shipping address",
            initialValue: false
        }),
        defineField({
            name: "createdAt",
            title:" Created At",
            type: "datetime",
            initialValue: ()=>new Date().toISOString(),
        }),


  ],
  preview:{
    select:{
        title: "name",
        subtitle: "address",
        city: "city",
        state: "state",
        isDefault: "default",
           
  },

  prepare({title, subtitle, city, state ,isDefault}){
    return{
        title: `${title} ${isDefault ? "(Default)": ""} `,
        subtitle: `${subtitle}, ${city}, ${state}`,
    };
  },
}
});
