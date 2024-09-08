import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_field

def create_custom_fields():
    custom_field = {
        'fieldname': 'preferred_payment_gateway',
        'label': 'Preferred Payment Gateway',
        'fieldtype': 'Link',
        'options': 'Payment Gateway',  # Points to the Payment Gateway doctype
        'insert_after': 'some_existing_field_in_lms_settings',
    }

    create_custom_field('LMS Settings', custom_field)



@frappe.whitelist()
def get_payment_gateway():
    # Fetch the preferred gateway from LMS Settings
    preferred_gateway = frappe.db.get_value("LMS Settings", None, "preferred_payment_gateway")
    
    # Fallback to the default gateway in Payment Gateway Settings if not set
    if not preferred_gateway:
        preferred_gateway = frappe.db.get_value("Payment Gateway Settings", None, "default_gateway")

    return {"gateway": preferred_gateway}

