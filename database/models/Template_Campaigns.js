let mongoose = require("mongoose")

const Schema = mongoose.Schema


const TemplateCampaignSchema = new Schema({
	name: { type: String },
	date: { type: Date },
	data: { type: Object }
})

const Template_Campaigns = mongoose.model("TCampaigns", TemplateCampaignSchema)

module.exports = Template_Campaigns
